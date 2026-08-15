import { useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
} from "@zxing/browser";

import {
  Camera,
  RefreshCw,
  ScanLine,
  CircleCheck,
  TriangleAlert,
  Keyboard,
} from "lucide-react";
import fetchProduct from "../apiService/scanner.api";
import NutritionItem from "../components/common/NutritionItem";

/* =========================================================
   GS1 APPLICATION IDENTIFIERS
========================================================= */

const AI_TABLE = {
  "00": {
    label: "SSCC (Serial Shipping Container Code)",
    length: 18,
  },

  "01": {
    label: "GTIN (Global Trade Item Number)",
    length: 14,
  },

  "02": {
    label: "Contained GTIN",
    length: 14,
  },

  "10": {
    label: "Batch / Lot Number",
    length: "var",
    max: 20,
  },

  "11": {
    label: "Production Date",
    length: 6,
    date: true,
  },

  "12": {
    label: "Due Date",
    length: 6,
    date: true,
  },

  "13": {
    label: "Packaging Date",
    length: 6,
    date: true,
  },

  "15": {
    label: "Best Before Date",
    length: 6,
    date: true,
  },

  "16": {
    label: "Sell By Date",
    length: 6,
    date: true,
  },

  "17": {
    label: "Expiration Date",
    length: 6,
    date: true,
  },

  "20": {
    label: "Product Variant",
    length: 2,
  },

  "21": {
    label: "Serial Number",
    length: "var",
    max: 20,
  },

  "22": {
    label: "Consumer Product Variant",
    length: "var",
    max: 20,
  },

  "30": {
    label: "Count of Items",
    length: "var",
    max: 8,
  },

  "37": {
    label: "Count of Trade Items Contained",
    length: "var",
    max: 8,
  },

  "310": {
    label: "Net Weight (kg)",
    length: 6,
    decimal: true,
  },

  "311": {
    label: "Length (m)",
    length: 6,
    decimal: true,
  },

  "400": {
    label: "Customer PO Number",
    length: "var",
    max: 30,
  },

  "401": {
    label: "Consignment Number",
    length: "var",
    max: 30,
  },

  "402": {
    label: "Shipment Number",
    length: "var",
    max: 30,
  },

  "410": {
    label: "Ship To Location (GLN)",
    length: 13,
  },

  "414": {
    label: "Location Number (GLN)",
    length: 13,
  },

  "420": {
    label: "Ship To Postal Code",
    length: "var",
    max: 20,
  },

  "421": {
    label: "Ship To Postal Code + Country",
    length: "var",
    max: 12,
  },

  "422": {
    label: "Country of Origin",
    length: 3,
  },

  "423": {
    label: "Country of Initial Processing",
    length: "var",
    max: 15,
  },

  "8003": {
    label: "Global Returnable Asset ID",
    length: "var",
    max: 30,
  },

  "8005": {
    label: "Price per Unit of Measure",
    length: 6,
  },

  "8200": {
    label: "Product URL",
    length: "var",
    max: 70,
  },

  "90": {
    label: "Mutually Agreed Information",
    length: "var",
    max: 30,
  },

  "91": {
    label: "Internal Company Information",
    length: "var",
    max: 90,
  },
};

/* GS1 field separator */
const GS = "\u001d";

/* =========================================================
   GS1 DATE FORMATTER
========================================================= */

function formatGs1Date(yymmdd) {
  if (!/^\d{6}$/.test(yymmdd)) {
    return yymmdd;
  }

  const yy = parseInt(yymmdd.slice(0, 2), 10);
  const mm = yymmdd.slice(2, 4);
  const dd = yymmdd.slice(4, 6);

  const year = yy >= 51 ? 1900 + yy : 2000 + yy;

  if (dd === "00") {
    return `${year}-${mm}`;
  }

  return `${year}-${mm}-${dd}`;
}

/* =========================================================
   GS1 PARSER
========================================================= */

function parseGs1(raw) {
  if (!raw) {
    return {
      fields: [],
      isGs1: false,
    };
  }

  let value = raw;

  // Remove symbology identifier such as ]C1 / ]Q3
  value = value.replace(/^\]\w\d/, "");

  // Remove FNC1 textual representation
  value = value.replace(/^\(FNC1\)/i, "");

  // Remove leading GS character
  if (value.startsWith(GS)) {
    value = value.slice(1);
  }

  const fields = [];

  let index = 0;
  let matchedAny = false;

  while (index < value.length) {
    let ai = null;

    // Check 4 digit → 3 digit → 2 digit
    for (const length of [4, 3, 2]) {
      const candidate = value.slice(index, index + length);

      if (AI_TABLE[candidate]) {
        ai = candidate;
        break;
      }
    }

    // Unknown AI
    if (!ai) {
      if (!matchedAny) {
        return {
          fields: [],
          isGs1: false,
        };
      }

      fields.push({
        ai: null,
        label: "Unparsed remainder",
        value: value.slice(index),
      });

      break;
    }

    matchedAny = true;

    const definition = AI_TABLE[ai];

    const start = index + ai.length;

    let fieldValue;

    /* Variable-length field */
    if (definition.length === "var") {
      const separatorIndex = value.indexOf(GS, start);

      const end =
        separatorIndex === -1
          ? Math.min(value.length, start + definition.max)
          : separatorIndex;

      fieldValue = value.slice(start, end);

      index =
        separatorIndex === -1
          ? end
          : end + 1;
    }

    /* Fixed-length field */
    else {
      fieldValue = value.slice(
        start,
        start + definition.length
      );

      index = start + definition.length;
    }

    let displayValue = fieldValue;

    /* Date conversion */
    if (definition.date) {
      displayValue = formatGs1Date(fieldValue);
    }

    /* Decimal conversion */
    if (
      definition.decimal &&
      /^\d+$/.test(fieldValue)
    ) {
      const indicator = parseInt(fieldValue[0], 10);

      const digits = fieldValue.slice(1);

      const number =
        parseFloat(digits) /
        Math.pow(10, indicator);

      displayValue = `${number}`;
    }

    fields.push({
      ai,
      label: definition.label,
      value: displayValue,
      raw: fieldValue,
    });
  }

  return {
    fields,
    isGs1: matchedAny,
  };
}

/* =========================================================
   BARCODE FORMAT DETECTION
========================================================= */

function detectFormat(text) {
  if (/^\d{12}$/.test(text)) {
    return "UPC-A";
  }

  if (/^\d{13}$/.test(text)) {
    return "EAN-13";
  }

  if (/^\d{8}$/.test(text)) {
    return "EAN-8";
  }

  return "Barcode";
}

/* =========================================================
   SCANNER COMPONENT
========================================================= */

/* =========================================================
   PRODUCT DETAIL UI HELPERS
========================================================= */

const ProductMeta = ({ label, value, mono = false }) => (
  <div className="rounded-xl border border-white/[0.06] bg-[#111311] px-4 py-3">
    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#555555]">
      {label}
    </p>
    <p
      className={`mt-1.5 truncate text-xs font-semibold text-[#d5d5d5] ${
        mono ? "font-mono" : ""
      }`}
      title={String(value)}
    >
      {value}
    </p>
  </div>
);

const getScoreTheme = (type, grade) => {
  const value = String(grade ?? "").toUpperCase();

  if (type === "nova") {
    const themes = {
      "1": {
        bg: "bg-[#008000]/10",
        border: "border-[#008000]/30",
        text: "text-[#58c858]",
        dot: "bg-[#008000]",
        label: "Group 1",
      },
      "2": {
        bg: "bg-[#78B82A]/10",
        border: "border-[#78B82A]/30",
        text: "text-[#9bd34b]",
        dot: "bg-[#78B82A]",
        label: "Group 2",
      },
      "3": {
        bg: "bg-[#F28C28]/10",
        border: "border-[#F28C28]/30",
        text: "text-[#F28C28]",
        dot: "bg-[#F28C28]",
        label: "Group 3",
      },
      "4": {
        bg: "bg-[#E53935]/10",
        border: "border-[#E53935]/30",
        text: "text-[#ff625e]",
        dot: "bg-[#E53935]",
        label: "Group 4",
      },
    };

    return (
      themes[value] || {
        bg: "bg-white/[0.03]",
        border: "border-white/[0.08]",
        text: "text-[#777777]",
        dot: "bg-[#555555]",
        label: "Not available",
      }
    );
  }

  const themes = {
    A: {
      bg: "bg-[#008000]/10",
      border: "border-[#008000]/30",
      text: "text-[#58c858]",
      dot: "bg-[#008000]",
    },
    B: {
      bg: "bg-[#78B82A]/10",
      border: "border-[#78B82A]/30",
      text: "text-[#9bd34b]",
      dot: "bg-[#78B82A]",
    },
    C: {
      bg: "bg-[#F5C400]/10",
      border: "border-[#F5C400]/30",
      text: "text-[#f5c400]",
      dot: "bg-[#F5C400]",
    },
    D: {
      bg: "bg-[#F28C28]/10",
      border: "border-[#F28C28]/30",
      text: "text-[#F28C28]",
      dot: "bg-[#F28C28]",
    },
    E: {
      bg: "bg-[#E53935]/10",
      border: "border-[#E53935]/30",
      text: "text-[#ff625e]",
      dot: "bg-[#E53935]",
    },
  };

  return (
    themes[value] || {
      bg: "bg-white/[0.03]",
      border: "border-white/[0.08]",
      text: "text-[#777777]",
      dot: "bg-[#555555]",
    }
  );
};

const getScoreDescription = (type, grade) => {
  const value = String(grade ?? "").toUpperCase();

  if (type === "nova") {
    const descriptions = {
      "1": "Unprocessed or minimally processed",
      "2": "Processed culinary ingredients",
      "3": "Processed food",
      "4": "Ultra-processed food",
    };

    return descriptions[value] || "Processing information unavailable";
  }

  if (type === "nutri") {
    return value
      ? `Nutri-Score ${value} classification`
      : "Nutrition classification unavailable";
  }

  if (type === "eco") {
    return value
      ? `Eco-Score ${value} classification`
      : "Environmental classification unavailable";
  }

  return "Classification unavailable";
};

const ScoreCard = ({ label, grade, description, type }) => {
  const theme = getScoreTheme(type, grade);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 ${theme.border} ${theme.bg}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#555555]">
            {label}
          </p>
          <p className="mt-2 text-xs leading-5 text-[#777777]">
            {description}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${theme.border} bg-[#080908]`}
        >
          <span className={`text-2xl font-extrabold ${theme.text}`}>
            {grade || "—"}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
        <span className={`text-xs font-bold ${theme.text}`}>
          {getScoreDescription(type, grade)}
        </span>
      </div>
    </div>
  );
};

const DetailedGradeCard = ({ title, grade, type, description }) => {
  const theme = getScoreTheme(type, grade);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101210] p-5">

      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#555555]">
          {title}
        </p>

        <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
      </div>

      <div className="mt-5 flex items-end gap-3">

        <span className={`text-5xl font-extrabold ${theme.text}`}>
          {grade || "—"}
        </span>

        <span className="mb-2 text-xs text-[#555555]">
          current grade
        </span>

      </div>

      <p className="mt-4 text-xs leading-5 text-[#666666]">
        {description}
      </p>

      <div className={`mt-4 rounded-xl border ${theme.border} ${theme.bg} px-3 py-2`}>
        <p className={`text-xs font-semibold ${theme.text}`}>
          {getScoreDescription(type, grade)}
        </p>
      </div>

    </div>
  );
};

const GradeLegend = ({ color, grade, label }) => (
  <div className="rounded-xl border border-white/[0.06] bg-[#111311] p-3">
    <div className="flex items-center gap-3">
      <span className={`h-7 w-7 rounded-lg ${color} flex items-center justify-center text-xs font-extrabold text-white`}>
        {grade}
      </span>

      <div>
        <p className="text-xs font-bold">{grade}</p>
        <p className="text-[10px] text-[#555555]">{label}</p>
      </div>
    </div>
  </div>
);

const NutritionMetric = ({ label, value, unit }) => (
  <div className="rounded-xl border border-white/[0.06] bg-[#080908] p-4">
    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#555555]">
      {label}
    </p>

    <div className="mt-2 flex items-baseline gap-1.5">
      <span className="text-xl font-extrabold">
        {value ?? "—"}
      </span>
      <span className="text-[10px] text-[#555555]">
        {unit}
      </span>
    </div>
  </div>
);

const CompactMetric = ({ label, value, unit }) => (
  <div className="rounded-xl border border-white/[0.06] bg-[#0b0d0b] px-3 py-3">
    <p className="text-[9px] uppercase tracking-wider text-[#555555]">
      {label}
    </p>
    <p className="mt-1 text-sm font-bold">
      {value ?? "—"}
      <span className="ml-1 text-[10px] font-normal text-[#555555]">
        {unit}
      </span>
    </p>
  </div>
);


export default function Scanner() {
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const controlsRef = useRef(null);

  
const [product, setProduct] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");

  // Barcode obtained from scanner
  const [barcode, setBarcode] = useState("");

  // Barcode entered manually
  const [barcodeInput, setBarcodeInput] = useState("");

  const [scanning, setScanning] = useState(false);

  const [error, setError] = useState("");

  const [cameraPermission, setCameraPermission] =
    useState(false);

  /* =======================================================
     GET CAMERAS
  ======================================================= */

  const getCameras = async () => {
    try {
      setError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        setError(
          "Camera access is not supported by this browser."
        );

        return;
      }

      /*
       * Request permission.
       * We don't keep this temporary stream.
       * ZXing will create its own stream.
       */

      const permissionStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      permissionStream
        .getTracks()
        .forEach((track) => track.stop());

      setCameraPermission(true);

      /*
       * Now enumerate cameras.
       */

      const devices =
        await BrowserMultiFormatReader.listVideoInputDevices();

      if (!devices.length) {
        setError(
          "No camera or webcam was found."
        );

        return;
      }

      setCameras(devices);

      setSelectedCamera((current) => {
        const stillExists =
          current &&
          devices.some(
            (device) =>
              device.deviceId === current
          );

        return stillExists
          ? current
          : devices[0].deviceId;
      });
    } catch (err) {
      console.error(
        "Camera permission error:",
        err
      );

      setCameraPermission(false);

      setError(
        "Camera permission was denied or no camera is available."
      );
    }
  };

  /* =======================================================
     START SCANNER
  ======================================================= */

  const startScanner = () => {
    if (!selectedCamera) {
      setError(
        "Please select a camera first."
      );

      return;
    }

    setError("");
    setBarcode("");

    setScanning(true);
  };

  /* =======================================================
     START ZXING AFTER VIDEO EXISTS
  ======================================================= */

  useEffect(() => {
    if (!scanning || !selectedCamera) {
      return;
    }

    let cancelled = false;

    const startScanner = async () => {
      try {
        setError("");

        // Wait until video is mounted
        await new Promise((resolve) => {
          requestAnimationFrame(resolve);
        });

        if (!videoRef.current || cancelled) {
          return;
        }

        const reader =
          new BrowserMultiFormatReader();

        reader.possibleFormats = [
          BarcodeFormat.EAN_13,
          BarcodeFormat.EAN_8,
          BarcodeFormat.UPC_A,
          BarcodeFormat.UPC_E,
          BarcodeFormat.CODE_128,
          BarcodeFormat.CODE_39,
          BarcodeFormat.ITF,
          BarcodeFormat.QR_CODE,
          BarcodeFormat.DATA_MATRIX,
        ];

        readerRef.current = reader;

        controlsRef.current =
          await reader.decodeFromConstraints(
            {
              video: {
                deviceId: {
                  exact: selectedCamera,
                },

                width: {
                  ideal: 1920,
                },

                height: {
                  ideal: 1080,
                },

                frameRate: {
                  ideal: 30,
                },
              },

              audio: false,
            },

            videoRef.current,

            async(result, decodeError) => {
              if (cancelled) {
                return;
              }

              /* SUCCESS */

              if (result) {
                const text = result.getText();

                console.log(
                  "BARCODE DETECTED:",
                  text
                );

                console.log(
                  "FORMAT:",
                  result
                    .getBarcodeFormat()
                    ?.toString()
                );

                setBarcode(text);
                const response = await fetchProduct(text);


                if (response?.success) {
                  setProduct(response.product);
                }


                if (controlsRef.current) {
                  try {
                    controlsRef.current.stop();
                  } catch (err) {
                    console.error(
                      "Failed to stop scanner:",
                      err
                    );
                  }

                  controlsRef.current = null;
                }

                readerRef.current = null;

                setScanning(false);

                return;
              }

              /*
               * Don't show NotFound errors.
               */

              if (decodeError) {
                console.log(
                  "ZXing decode attempt:",
                  decodeError
                );
              }
            }
          );

        /* Make sure video actually starts */

        if (videoRef.current) {
          videoRef.current
            .play()
            .catch((err) => {
              console.error(
                "Video play error:",
                err
              );
            });
        }
      } catch (err) {
        console.error(
          "Scanner initialization error:",
          err
        );

        if (!cancelled) {
          setError(
            `Scanner failed: ${err?.message || "Unknown error"
            }`
          );

          setScanning(false);
        }
      }
    };

    startScanner();

    return () => {
      cancelled = true;

      if (controlsRef.current) {
        try {
          controlsRef.current.stop();
        } catch (err) {
          console.error(
            "Scanner stop error:",
            err
          );
        }

        controlsRef.current = null;
      }

      readerRef.current = null;
    };
  }, [scanning, selectedCamera]);

  /* =======================================================
     STOP SCANNER
  ======================================================= */

  const stopScanner = () => {
    if (controlsRef.current) {
      try {
        controlsRef.current.stop();
      } catch (err) {
        console.error(
          "Scanner stop error:",
          err
        );
      }

      controlsRef.current = null;
    }

    readerRef.current = null;

    setScanning(false);
  };

  /* =======================================================
     MANUAL BARCODE
  ======================================================= */

  const submitManualBarcode = async () => {
    const value = barcodeInput.trim();

    if (!value) {
      setError("Please enter a barcode.");

      return;
    }

    setError("");

    setBarcode(value);

    const response = await fetchProduct(value);
    if (response?.success) {
      setProduct(response.product);
    }
    console.log("Api hit successfully", response)
  };

  /* =======================================================
     SCAN AGAIN
  ======================================================= */

  const scanAgain = () => {
    setBarcode("");
    setBarcodeInput("");
    setProduct(null);
    setShowAnalysis(false);
    setError("");
  };

  /* =======================================================
     COMPONENT CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (readerRef.current) {
        try {
          readerRef.current.reset();
        } catch (err) {
          console.error(err);
        }

        readerRef.current = null;
      }

      if (controlsRef.current) {
        try {
          controlsRef.current.stop();
        } catch (err) {
          console.error(err);
        }

        controlsRef.current = null;
      }
    };
  }, []);

  /* =======================================================
     RESULT DATA
  ======================================================= */

  const gs1 = parseGs1(barcode);

  const format = detectFormat(barcode);

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen overflow-hidden bg-[#090909] px-4 py-10 text-white sm:px-6">

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -right-60 -top-60 h-[600px] w-[600px] rounded-full bg-[#91FF00]/[0.035] blur-[150px]" />
          <div className="absolute -bottom-60 -left-60 h-[550px] w-[550px] rounded-full bg-[#91FF00]/[0.025] blur-[150px]" />
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 text-center">

          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#91FF00]/20 bg-[#91FF00]/[0.06]">

            <Camera className="h-8 w-8 text-[#91FF00]" />

          </div>

          <h1 className="text-4xl font-extrabold tracking-[-1.5px] sm:text-5xl lg:text-6xl">
            Product Scanner
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#858585] sm:text-base">
            Scan product barcodes using your webcam
            or enter a barcode manually
          </p>

        </div>

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div className="relative z-10 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0d0f0d] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:p-7">

          {/* =================================================
              CAMERA SELECTION
          ================================================= */}

          {!scanning && !barcode && (

            <div className="mb-6">

              <div className="flex items-center justify-between mb-2">

                <label className="text-sm font-medium text-[#858585]">
                  Select Camera
                </label>

                {cameraPermission && (
                  <span className="text-xs text-green-400 flex items-center gap-1">

                    <span className="w-2 h-2 rounded-full bg-green-400" />

                    Permission granted

                  </span>
                )}

              </div>

              <div className="flex gap-3">

                <select
                  value={selectedCamera}
                  onChange={(event) =>
                    setSelectedCamera(
                      event.target.value
                    )
                  }
                  className="flex-1 min-w-0 bg-[#111411] border border-white/[0.10] rounded-xl px-4 py-3 text-white outline-none focus:border-[#91FF00] focus:ring-1 focus:ring-blue-500"
                >

                  <option value="">
                    {cameras.length
                      ? "Select camera"
                      : "No cameras loaded"}
                  </option>

                  {cameras.map(
                    (camera, index) => (
                      <option
                        key={camera.deviceId}
                        value={camera.deviceId}
                      >
                        {camera.label ||
                          `Camera ${index + 1}`}
                      </option>
                    )
                  )}

                </select>

                <button
                  onClick={getCameras}
                  className="shrink-0 px-5 py-3 rounded-xl bg-[#111411] hover:bg-[#171b17] border border-white/[0.10] transition"
                  title="Detect cameras"
                >

                  <RefreshCw className="w-5 h-5" />

                </button>

              </div>

              <p className="text-xs text-[#555555] mt-2">
                Click the refresh button to detect
                your laptop webcam or connected camera.
              </p>

            </div>
          )}

          {/* =================================================
              READY SCREEN
          ================================================= */}

          {!scanning && !barcode && (

            <div className="flex flex-col items-center justify-center py-12">

              <div className="w-24 h-24 rounded-full bg-[#111411] flex items-center justify-center mb-6">

                <ScanLine className="w-11 h-11 text-[#555555]" />

              </div>

              <h2 className="text-xl font-semibold">
                Ready to Scan
              </h2>

              <p className="text-[#777777] text-sm mt-2 text-center max-w-md leading-relaxed">
                Select your webcam and scan a barcode,
                or enter the barcode manually.
              </p>

              {/* CAMERA BUTTON */}

              <button
                onClick={startScanner}
                disabled={!selectedCamera}
                className="mt-7 px-8 py-3.5 rounded-xl bg-[#91FF00] hover:bg-[#a7ff36] disabled:bg-slate-700 disabled:text-[#555555] transition-all font-semibold inline-flex items-center gap-2 shadow-lg shadow-[0_0_35px_rgba(145,255,0,0.12)]"
              >

                <Camera className="w-5 h-5" />

                Start Scanner

              </button>

              {/* DIVIDER */}

              <div className="flex items-center gap-4 w-full max-w-md my-7">

                <div className="flex-1 h-px bg-[#111411]" />

                <span className="text-xs text-[#555555]">
                  OR
                </span>

                <div className="flex-1 h-px bg-[#111411]" />

              </div>

              {/* MANUAL INPUT */}

              <div className="w-full max-w-md">

                <div className="flex items-center gap-2 mb-2">

                  <Keyboard className="w-4 h-4 text-[#777777]" />

                  <label className="text-sm font-medium text-[#858585]">
                    Enter Barcode Manually
                  </label>

                </div>

                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) =>
                    setBarcodeInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submitManualBarcode();
                    }
                  }}
                  placeholder="Enter EAN, UPC or GS1 barcode"
                  className="w-full bg-[#111411] border border-white/[0.10] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 outline-none focus:border-[#91FF00] focus:ring-1 focus:ring-blue-500 font-mono"
                />

                <button
                  onClick={submitManualBarcode}
                  disabled={!barcodeInput.trim()}
                  className="w-full mt-3 py-3.5 rounded-xl bg-slate-700 hover:bg-[#1b201b] disabled:bg-[#111411] disabled:text-[#444444] transition font-semibold"
                >
                  Use This Barcode
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              CAMERA VIEW
          ================================================= */}
          {product && (
            <div className="mt-8 space-y-5">

              {/* =================================================
                  PRODUCT HERO
              ================================================= */}

              <section className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0d0f0d] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">

                <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#91FF00]/[0.055] blur-[100px] pointer-events-none" />

                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

                  {/* PRODUCT IMAGE */}

                  <div className="relative min-h-[360px] overflow-hidden border-b border-white/[0.07] bg-[#080908] lg:border-b-0 lg:border-r">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,255,0,0.07),transparent_62%)]" />

                    <div className="absolute left-5 top-5 z-10 rounded-lg border border-[#91FF00]/20 bg-[#91FF00]/[0.06] px-3 py-2 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#91FF00] shadow-[0_0_10px_#91FF00]" />
                        <span className="text-[10px] font-bold tracking-[0.12em] text-[#91FF00]">
                          PRODUCT DETECTED
                        </span>
                      </div>
                    </div>

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name || "Food product"}
                        className="relative z-10 h-full min-h-[360px] w-full object-contain p-10 drop-shadow-[0_30px_45px_rgba(0,0,0,0.7)]"
                      />
                    ) : (
                      <div className="flex min-h-[360px] items-center justify-center text-sm text-[#555555]">
                        No product image available
                      </div>
                    )}

                    <div className="absolute bottom-5 left-5 right-5 z-10 rounded-xl border border-white/[0.07] bg-[#0b0d0b]/90 p-3 backdrop-blur-xl">
                      <p className="text-[9px] uppercase tracking-[0.16em] text-[#555555]">
                        BARCODE
                      </p>
                      <p className="mt-1 break-all font-mono text-xs text-[#91FF00]">
                        {product.barcodeKey || barcode}
                      </p>
                    </div>

                  </div>

                  {/* PRODUCT INFORMATION */}

                  <div className="relative p-6 sm:p-8 lg:p-10">

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[#91FF00]/20 bg-[#91FF00]/[0.06] px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#91FF00]">
                        PRODUCT DETAILS
                      </span>

                      {product.source && (
                        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold tracking-wider text-[#666666]">
                          {product.source === "redis" ? "CACHED DATA" : "OPEN FOOD FACTS"}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                      {product.name || "Unknown Product"}
                    </h2>

                    <p className="mt-2 text-base font-medium capitalize text-[#858585]">
                      {product.brand || "Unknown Brand"}
                    </p>

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">

                      <ProductMeta label="Quantity" value={product.quantity || "—"} />

                      <ProductMeta
                        label="Barcode"
                        value={product.barcodeKey || barcode}
                        mono
                      />

                      <ProductMeta
                        label="Source"
                        value={product.source === "redis" ? "Redis cache" : "Open Food Facts"}
                      />

                    </div>

                    <div className="mt-7 border-t border-white/[0.07] pt-6">

                      <div className="flex items-end justify-between gap-4">

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#555555]">
                            QUICK ASSESSMENT
                          </p>

                          <p className="mt-2 text-sm leading-6 text-[#777777]">
                            Review the product's nutrition, ingredients, allergens,
                            processing classification and environmental score below.
                          </p>
                        </div>

                        <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#91FF00]/10 text-[#91FF00] sm:flex">
                          ✓
                        </span>

                      </div>

                    </div>

                  </div>

                </div>
              </section>


              {/* =================================================
                  SCORE OVERVIEW
              ================================================= */}

              <section>

                <div className="mb-4">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#91FF00]">
                    PRODUCT SCORES
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold tracking-tight">
                    At a glance
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-3">

                  <ScoreCard
                    label="Nutri-Score"
                    grade={product.nutriScore}
                    description="Nutrition quality classification"
                    type="nutri"
                  />

                  <ScoreCard
                    label="NOVA"
                    grade={product.novaGroup}
                    description="Food processing classification"
                    type="nova"
                  />

                  <ScoreCard
                    label="Eco-Score"
                    grade={product.ecoScore}
                    description="Environmental impact classification"
                    type="eco"
                  />

                </div>

              </section>


              {/* =================================================
                  EXPAND ANALYSIS
              ================================================= */}

              <button
                type="button"
                onClick={() => setShowAnalysis((current) => !current)}
                className="group flex w-full items-center justify-between rounded-2xl border border-[#91FF00]/20 bg-[#0d120d] px-5 py-4 text-left transition duration-300 hover:border-[#91FF00]/40 hover:bg-[#101610]"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#91FF00]/10 text-sm font-extrabold text-[#91FF00]">
                    AI
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      {showAnalysis ? "Hide Product Analysis" : "View Full Product Analysis"}
                    </p>

                    <p className="mt-1 text-xs text-[#666666]">
                      {showAnalysis
                        ? "Collapse the detailed score and nutrition breakdown."
                        : "See grades, color meanings and a deeper product summary."}
                    </p>
                  </div>

                </div>

                <span className="text-lg text-[#91FF00] transition-transform duration-300 group-hover:translate-x-1">
                  {showAnalysis ? "↑" : "→"}
                </span>

              </button>


              {showAnalysis && (
                <div className="space-y-5">

                  {/* GRADE LEGEND */}

                  <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-5 sm:p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-[10px] font-bold tracking-[0.18em] text-[#91FF00]">
                          GRADE GUIDE
                        </p>
                        <h3 className="mt-2 text-xl font-extrabold">
                          What the colors mean
                        </h3>
                      </div>

                      <span className="rounded-full border border-white/[0.07] px-3 py-1 text-[10px] text-[#666666]">
                        REFERENCE
                      </span>

                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

                      <GradeLegend color="bg-[#008000]" grade="A" label="Best category" />
                      <GradeLegend color="bg-[#78B82A]" grade="B" label="Good category" />
                      <GradeLegend color="bg-[#F5C400]" grade="C" label="Middle category" />
                      <GradeLegend color="bg-[#F28C28]" grade="D" label="Lower category" />
                      <GradeLegend color="bg-[#E53935]" grade="E" label="Lowest category" />

                    </div>

                    <p className="mt-4 text-xs leading-5 text-[#555555]">
                      The A–E colors are a visual guide for score-based product
                      classifications. They should be interpreted together with
                      the underlying nutrition and ingredient information.
                    </p>

                  </section>


                  {/* CURRENT GRADES */}

                  <section className="grid gap-4 md:grid-cols-3">

                    <DetailedGradeCard
                      title="Nutri-Score"
                      grade={product.nutriScore}
                      type="nutri"
                      description="A color-coded nutrition classification from A to E."
                    />

                    <DetailedGradeCard
                      title="NOVA Group"
                      grade={product.novaGroup}
                      type="nova"
                      description="A four-group classification describing the level of food processing."
                    />

                    <DetailedGradeCard
                      title="Eco-Score"
                      grade={product.ecoScore}
                      type="eco"
                      description="A color-coded environmental impact classification."
                    />

                  </section>


                  {/* NUTRITION SUMMARY */}

                  {product.nutrition && (
                    <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-5 sm:p-6">

                      <div>
                        <p className="text-[10px] font-bold tracking-[0.18em] text-[#91FF00]">
                          NUTRITION BREAKDOWN
                        </p>

                        <h3 className="mt-2 text-xl font-extrabold">
                          What's in the product
                        </h3>

                        <p className="mt-1 text-xs text-[#555555]">
                          Values per 100g where provided by the product data.
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">

                        <NutritionMetric
                          label="Calories"
                          value={product.nutrition.calories}
                          unit="kcal"
                        />

                        <NutritionMetric
                          label="Fat"
                          value={product.nutrition.fat}
                          unit="g"
                        />

                        <NutritionMetric
                          label="Saturated Fat"
                          value={product.nutrition.saturatedFat}
                          unit="g"
                        />

                        <NutritionMetric
                          label="Carbohydrates"
                          value={product.nutrition.carbohydrates}
                          unit="g"
                        />

                        <NutritionMetric
                          label="Sugar"
                          value={product.nutrition.sugar}
                          unit="g"
                        />

                        <NutritionMetric
                          label="Protein"
                          value={product.nutrition.protein}
                          unit="g"
                        />

                        <NutritionMetric
                          label="Fiber"
                          value={product.nutrition.fiber}
                          unit="g"
                        />

                        <NutritionMetric
                          label="Salt"
                          value={product.nutrition.salt}
                          unit="g"
                        />

                      </div>

                    </section>
                  )}


                  {/* ALLERGENS */}

                  {product.allergens && (
                    <section className="rounded-2xl border border-red-500/20 bg-red-500/[0.035] p-5 sm:p-6">

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                          !
                        </div>

                        <div>
                          <p className="text-[10px] font-bold tracking-[0.18em] text-red-400">
                            ALLERGEN INFORMATION
                          </p>

                          <h3 className="mt-2 text-lg font-bold">
                            Allergens identified in product data
                          </h3>
                        </div>

                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">

                        {product.allergens
                          .split(",")
                          .map((allergen, index) => (
                            <span
                              key={index}
                              className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold capitalize text-red-300"
                            >
                              {allergen.trim()}
                            </span>
                          ))}

                      </div>

                    </section>
                  )}


                  {/* INGREDIENTS */}

                  {product.ingredients && (
                    <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-5 sm:p-6">

                      <p className="text-[10px] font-bold tracking-[0.18em] text-[#91FF00]">
                        INGREDIENT INTELLIGENCE
                      </p>

                      <h3 className="mt-2 text-xl font-extrabold">
                        Ingredients
                      </h3>

                      <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#080908] p-5">

                        <p className="whitespace-pre-line text-sm leading-7 text-[#777777]">
                          {product.ingredients}
                        </p>

                      </div>

                    </section>
                  )}

                </div>
              )}


              {/* =================================================
                  COMPACT NUTRITION
              ================================================= */}

              {product.nutrition && (
                <section className="rounded-2xl border border-white/[0.07] bg-[#101210] p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-[10px] font-bold tracking-[0.18em] text-[#555555]">
                        NUTRITION
                      </p>

                      <h3 className="mt-1 text-base font-bold">
                        Nutrition snapshot
                      </h3>
                    </div>

                    <span className="rounded-full bg-[#91FF00]/10 px-3 py-1.5 text-[10px] font-bold text-[#91FF00]">
                      PER 100G
                    </span>

                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">

                    <CompactMetric label="Calories" value={product.nutrition.calories} unit="kcal" />
                    <CompactMetric label="Sugar" value={product.nutrition.sugar} unit="g" />
                    <CompactMetric label="Fat" value={product.nutrition.fat} unit="g" />
                    <CompactMetric label="Protein" value={product.nutrition.protein} unit="g" />

                  </div>

                </section>
              )}


              {/* =================================================
                  ACTION
              ================================================= */}

              <button
                onClick={scanAgain}
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#91FF00] px-7 py-4 text-sm font-bold text-black transition duration-300 hover:bg-[#a7ff36] hover:shadow-[0_0_35px_rgba(145,255,0,0.2)]"
              >
                Scan Another Product

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </div>
          )}

          {scanning && (

            <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden rounded-2xl bg-black border border-white/[0.07]">

              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10 pointer-events-none" />

              {/* TOP STATUS */}

              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">

                <div className="px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-sm font-medium">
                  Scan barcode anywhere on the screen
                </div>

              </div>

              {/* SCANNING LINE */}

              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-1/2
                  h-0.5
                  bg-blue-400
                  shadow-[0_0_18px_4px_rgba(96,165,250,0.8)]
                  animate-pulse
                  pointer-events-none
                "
              />

              {/* STOP BUTTON */}

              <button
                onClick={stopScanner}
                className="absolute top-5 right-5 z-20 px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 backdrop-blur-md text-white text-sm font-medium"
              >
                Stop
              </button>

              {/* BOTTOM INSTRUCTION */}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">

                <div className="px-5 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-center">

                  <p className="text-white text-sm font-medium">
                    Position the barcode anywhere inside the camera
                  </p>

                  <p className="text-[#858585] text-xs mt-1">
                    The entire camera view is being scanned
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* =================================================
              BARCODE RESULT
          ================================================= */}

          {barcode && (

            <div>

              {/* SUCCESS */}

              <div className="p-5 rounded-2xl bg-[#91FF00]/[0.035] border border-[#91FF00]/20">

                <div className="flex items-center gap-3 mb-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#91FF00]/10 text-[#91FF00]">

                    <CircleCheck className="w-6 h-6" />

                  </div>

                  <div>

                    <h3 className="text-lg font-bold text-[#91FF00]">
                      Barcode Detected
                    </h3>

                    <p className="text-xs text-[#777777]">
                      {gs1.isGs1
                        ? "GS1 structured data detected"
                        : `Detected format: ${format}`}
                    </p>

                  </div>

                </div>

                {/* RAW DATA */}

                <div className="bg-[#080908] rounded-xl p-4">

                  <p className="text-xs text-[#555555] mb-2">
                    RAW BARCODE DATA
                  </p>

                  <p className="text-lg md:text-2xl font-mono tracking-widest break-all text-white">
                    {barcode}
                  </p>

                </div>

              </div>

              {/* =================================================
                  GS1 FIELDS
              ================================================= */}

              {gs1.isGs1 && (

                <div className="mt-5 bg-[#080908] border border-white/[0.07] rounded-2xl p-5">

                  <div className="flex items-center justify-between mb-4">

                    <div>

                      <p className="text-sm font-semibold text-white">
                        Extracted GS1 Data
                      </p>

                      <p className="text-xs text-[#555555] mt-1">
                        Structured information found
                        inside the barcode
                      </p>

                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#91FF00]/[0.06] text-[#91FF00] text-xs border border-[#91FF00]/20">
                      GS1
                    </span>

                  </div>

                  <div className="space-y-1">

                    {gs1.fields.map(
                      (field, index) => (

                        <div
                          key={`${field.ai}-${index}`}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-white/[0.07] last:border-0"
                        >

                          <div>

                            <p className="text-sm text-slate-200">
                              {field.label}
                            </p>

                            {field.ai && (

                              <p className="text-xs text-[#555555] mt-1">
                                Application Identifier:{" "}
                                {field.ai}
                              </p>

                            )}

                          </div>

                          <p className="text-sm font-mono text-[#91FF00] sm:text-right break-all">
                            {field.value}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>
              )}

              {/* =================================================
                  NORMAL BARCODE
              ================================================= */}

              {!gs1.isGs1 && (

                <div className="mt-5 p-5 rounded-2xl bg-[#080908] border border-white/[0.07]">

                  <p className="text-xs text-[#555555] uppercase tracking-wider">
                    Barcode Format
                  </p>

                  <p className="text-xl font-semibold mt-2">
                    {format}
                  </p>

                  <p className="text-sm text-[#555555] mt-3 leading-relaxed">
                    This is a standard product barcode.
                    It normally identifies the product
                    through its GTIN rather than
                    containing the product name, price,
                    stock or description.
                  </p>

                </div>
              )}

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="flex gap-3 mt-5">

                <button
                  onClick={scanAgain}
                  className="flex-1 py-3.5 rounded-xl bg-[#91FF00] hover:bg-[#a7ff36] transition font-semibold shadow-lg shadow-[0_0_35px_rgba(145,255,0,0.12)]"
                >
                  Scan Another Product
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mt-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">

              <TriangleAlert className="w-5 h-5 mt-0.5 shrink-0" />

              <div>

                <p className="font-medium">
                  Scanner Error
                </p>

                <p className="text-sm mt-1 text-red-300/80">
                  {error}
                </p>

              </div>

            </div>
          )}

        </div>

        {/* =================================================
            SUPPORTED FORMATS
        ================================================= */}

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-xs text-[#555555]">

          <span>✓ EAN-13</span>
          <span>✓ EAN-8</span>
          <span>✓ UPC-A</span>
          <span>✓ Code 128</span>
          <span>✓ GS1-128</span>
          <span>✓ GS1 DataMatrix</span>
          <span>✓ GS1 QR</span>

        </div>

      </div>

    </div>
  );
}
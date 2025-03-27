"use client";
import React, { FC, useEffect, useState } from "react";

import { Viewer } from "@react-pdf-viewer/core";

import { Worker } from "@react-pdf-viewer/core";

interface Props {
  file: string | ArrayBuffer | Blob | null;
  setIsPdfModal: (isPdfModal: boolean) => void;
}

const PdfViewerModal: FC<Props> = ({ file, setIsPdfModal }) => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [viewPdf, setViewPdf] = useState<string | null>(null);
  const [viewPdfStr, setViewPdfStr] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const fileType = ["application/pdf"];

    if (typeof file === "string") {
      setViewPdfStr(file);
      setDownloadUrl(file);
    }

    if (file instanceof Blob) {
      if (fileType.includes(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          const result = e.target?.result as string | null;
          setViewPdf(result);
          setDownloadUrl(URL.createObjectURL(file));
        };
      } else {
        setViewPdf(null);
      }
    } else {
      console.log("select your file");
    }
  }, [file]);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "document.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className='fixed w-full h-full top-0 left-0 z-[99] flex justify-center items-center transition ease-in-out duration-[900ms] bg-[rgba(0,0,0,0.54)]'
      onClick={() => setIsPdfModal(false)}>
      <div
        className='relative max-w-[60%] overflow-y-auto h-[93vh] w-full bg-white'
        onClick={(e) => e.stopPropagation()}>
        <div className='pdf-container'>
          {viewPdf ? (
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
              <Viewer fileUrl={viewPdf} />
            </Worker>
          ) : viewPdfStr ? (
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
              <Viewer fileUrl={viewPdfStr} />
            </Worker>
          ) : (
            <h1 className='w-full text-center mt-10 text-xl text-gray-700 font-medium'>
              No pdf file selected
            </h1>
          )}
        </div>

        {(viewPdf || viewPdfStr) && downloadUrl && (
          <button
            onClick={handleDownload}
            type='button'
            className='fixed border-4 border-blue-800 bottom-8 right-8 bg-blue-600 font-bold hover:bg-blue-700 text-white py-2 px-7 rounded-full shadow-lg z-10'>
            DOWNLOAD PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default PdfViewerModal;

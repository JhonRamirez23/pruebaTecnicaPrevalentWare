import { CSVLink } from 'react-csv';

interface CsvData {
  headers: { label: string; key: string }[];
  data: any[];
  filename: string;
}

export default function CsvDownloadButton({ csvData }: { csvData: CsvData }) {
  return (
    <CSVLink
      headers={csvData.headers}
      data={csvData.data}
      filename={csvData.filename}
      className='inline-block bg-green-500 text-white px-4 py-2 rounded'
    >
      Descargar CSV
    </CSVLink>
  );
}

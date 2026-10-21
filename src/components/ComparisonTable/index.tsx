interface ComparisonRow {
  label: string;
  values: string[];
}

interface ComparisonTableProps {
  headers: string[];
  rows: ComparisonRow[];
  className: string;
}

const ComparisonTable = ({ headers, rows, className }: ComparisonTableProps) => (
  <div className={className}>
    <table>
      <thead>
        <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            {row.values.map((value, index) => (
              <td key={`${row.label}-${index}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ComparisonTable;

import React from "react";

function clsx(...c) {
  return c.filter(Boolean).join(" ");
}

/**
 * Basic table
 * @param {object} props
 * @param {Array<React.ReactNode>} props.columns
 * @param {Array<Array<React.ReactNode>>} props.rows
 * @param {string} [props.emptyText]
 * @param {boolean} [props.compact]
 * @param {string} [props.className]
 */
export default function Table({
  columns = [],
  rows = [],
  emptyText = "No data",
  compact = false,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800",
        className
      )}>
      <table
        className={clsx("w-full text-left", compact ? "text-sm" : "text-sm")}>
        <thead className="bg-zinc-100 dark:bg-zinc-900/50">
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                className={clsx(
                  "px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300",
                  i === 0 && "rounded-tl-2xl",
                  i === columns.length - 1 && "rounded-tr-2xl"
                )}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {rows.length === 0 ? (
            <tr>
              <td
                className="px-4 py-6 text-center text-zinc-500 dark:text-zinc-400"
                colSpan={columns.length || 1}>
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((r, ri) => (
              <tr
                key={ri}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
                {r.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

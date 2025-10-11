import styles from "./CustomLabel.module.scss";

export const CustomLabel = (props: any) => {
  const { x, y, value } = props;
  if (!value || typeof value !== "string") return null;

  const lines = value.split("\n");
  const lineHeight = 16;
  const totalHeight = lineHeight * (lines.length - 1);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      className={styles.text}
    >
      {lines.map((line, i) => (
        <tspan
          key={i}
          x={x}
          dy={i === 0 ? -totalHeight / 2 : lineHeight}
          className={styles.tspan}
        >
          {line}
        </tspan>
      ))}
    </text>
  );
};

export function AppIconSvg({ size }: { size: number }) {
  const dot = Math.max(size * 0.1, 10);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#93314C",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: size * 0.58,
          fontWeight: 700,
          color: "#FAF5F0",
          display: "flex",
          lineHeight: 1,
          fontFamily: "Georgia, serif",
        }}
      >
        N
      </div>
      <div
        style={{
          position: "absolute",
          width: dot,
          height: dot,
          borderRadius: "50%",
          background: "#C6A15B",
          right: size * 0.22,
          bottom: size * 0.24,
          display: "flex",
        }}
      />
    </div>
  );
}

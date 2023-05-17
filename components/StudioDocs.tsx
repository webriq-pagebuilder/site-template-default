const CANVA_WSTUDIO_PRESENTATION =
  process.env.NEXT_PUBLIC_CANVA_WSTUDIO_PRESENTATION ||
  "https://www.canva.com/design/DAFGKT1MdX4/view?embed#20";

export const StudioDocs = () => {
  return (
    <iframe
      src={CANVA_WSTUDIO_PRESENTATION}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
      }}
      frameBorder={0}
      allowFullScreen={true}
    ></iframe>
  );
};

export function YoutubeVideo({
  videoLinkId,
  title,
}: {
  videoLinkId: string;
  title: string;
}) {
  return (
    <div className="aspect-video">
      <iframe
        aria-label="Show Video Frame"
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoLinkId}`}
        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden;border-radius:8px}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${`https://www.youtube.com/embed/${videoLinkId}`}><img src=${`https://i.ytimg.com/vi_webp/${videoLinkId}/maxresdefault.webp`} alt=${title} loading="lazy" /><span>▶</span></a>`}
        frameBorder="0"
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
}

import { useEffect } from "react";
import tocbot from "tocbot";

export default function Toc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".blogContents",
      headingSelector: "h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      // Main class to add to lists.
      linkClass: "toc-link",
      // Class that gets added when a list should be collapsed.
      isCollapsedClass: "is-collapsed",
      // Smooth scrolling enabled.
      scrollSmooth: true,
      // Smooth scroll duration.
      scrollSmoothDuration: 420,
      headingsOffset: 40,
      collapseDepth: 0,
      
    });

    return () => tocbot.destroy();
  }, []);



  return (
    <>
      <div className=" bg-white mt-6 p-5 rounded-2xl">
        <p className="text-lg font-bold">目次</p>
        <div className="toc"></div>
        <style jsx global>{`
          .toc {
            border-radius: 0.25rem;
            padding: 1rem;
            font-size: 1rem;
          }

          .toc-list .toc-list {
            padding-left: 1rem;
            padding-top: 0.5rem;
          }

          .toc-list-item {
            padding-bottom: 0.5rem;
          }

          .toc-list-item:last-child {
            padding-bottom: 0;
          }

          .toc-link {
            color: rgba(156, 163, 175, 0.7);
          }

          .is-active-link {
            color: #282828;
            font-weight: 700;
          }
        `}</style>
      </div>
    </>
  );
}

import { useEffect } from "react";
import styles from "@/routes/_index/_index.module.css";

const Scroller: React.FC = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(`.${styles.scroller}`);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");

        const scrollerInner = scroller.querySelector(
          `.${styles.scroller__inner}`,
        );
        const scrollerContent = Array.from(scrollerInner!.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner?.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <div className={styles.scroller_container}>
      <div className={styles.scroller} data-speed="fast">
      <div className={styles.scroller__inner}>

        <ul className={`${styles.tag_list} ${styles.scroller__inner}`}>
          <img src="https://i.pravatar.cc/150?img=1" alt="" />
          <img src="https://i.pravatar.cc/150?img=2" alt="" />
          <img src="https://i.pravatar.cc/150?img=3" alt="" />
          <img src="https://i.pravatar.cc/150?img=4" alt="" />
          <img src="https://i.pravatar.cc/150?img=5" alt="" />
          <img src="https://i.pravatar.cc/150?img=6" alt="" />
        </ul>
      </div>
      </div>

      <div className={styles.scroller} data-direction="right" data-speed="slow">
        <div className={styles.scroller_bottom}>
          <div className={styles.scroller__inner}>
            <ul className={`${styles.tag_list} ${styles.scroller__inner}`}>
              <img src="https://i.pravatar.cc/150?img=1" alt="" />
              <img src="https://i.pravatar.cc/150?img=2" alt="" />
              <img src="https://i.pravatar.cc/150?img=3" alt="" />
              <img src="https://i.pravatar.cc/150?img=4" alt="" />
              <img src="https://i.pravatar.cc/150?img=5" alt="" />
              <img src="https://i.pravatar.cc/150?img=6" alt="" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroller;

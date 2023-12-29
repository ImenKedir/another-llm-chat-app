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
            <img src="/images/image1.jpeg" alt="" />
            <img src="/images/image2.jpeg" alt="" />
            <img src="/images/image3.jpeg" alt="" />
            <img src="/images/image4.jpeg" alt="" />
            <img src="/images/image5.jpeg" alt="" />
            <img src="/images/image6.jpeg" alt="" />
            <img src="/images/image7.jpeg" alt="" />
          </ul>
        </div>
      </div>

      <div className={styles.scroller} data-direction="right" data-speed="slow">
        <div className={styles.scroller_bottom}>
          <div className={styles.scroller__inner}>
            <ul className={`${styles.tag_list} ${styles.scroller__inner}`}>
              <img src="/images/image8.jpeg" alt="" />
              <img src="/images/image9.jpeg" alt="" />
              <img src="/images/image10.jpeg" alt="" />
              <img src="/images/image11.jpeg" alt="" />
              <img src="/images/image12.jpeg" alt="" />
              <img src="/images/image13.jpeg" alt="" />
              <img src="/images/image14.jpeg" alt="" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroller;

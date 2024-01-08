import { Link } from "@remix-run/react";
import Scroller from "@/routes/_index/scroller";
import FeatureGrid from "@/routes/_index/feature_grid";
import MenuToggle from "@/routes/_index/menu_toggle";
import FAQ from "@/routes/_index/faq";
import logos from "/logos/logos.png";
import styles from "@/routes/_index/_index.module.css";
import { Suspense, useState } from "react";

export default function Index() {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  const toggleNav = () => {
    setIsDropdownExpanded(!isDropdownExpanded);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--primary-dark)] color-white items-center box-border font-[Geist]">
      <div className="sticky top-0 w-full z-10 pb-4">
        <div
          className={
            isDropdownExpanded
              ? "absolute top-0 w-full bg-transparent opacity-100 backdrop-blur-xl h-[400px] pt-[20px] md:h-[80px]"
              : "absolute flex top-0 w-full bg-transparent opacity-100 backdrop-blur-xl justify-center items-center h-[70px] box-border"
          }
        >
          <div className="flex flex-row justify-between items-center w-full max-w-[1440px] h-[60px]">
            <div className="flex pl-[30px] items-center text-white text-2xl">
              <h3>NaughtyML</h3>
            </div>
            {/* Displays on < 720px  */}
            <div className="inline-block cursor-pointer pr-[20px] md:hidden">
              <MenuToggle onToggle={toggleNav} />
            </div>
            {/* Displays on > 720px  */}
            <div className= "hidden md:pr-[20px] md:flex md:flex-row md:gap-[40px] md:items-center md:text-white ">
              <Link to="/app" className="py-[5px] text-center cursor-pointer no-underline">
                Blog
              </Link>
              <Link to="/app" className="py-[5px] text-center cursor-pointer no-underline ">
                Community
              </Link>
              <Link to="/app" className="bg-[var(--primary-accent)] text-center cursor-pointer rounded-2xl w-[125px] py-[10px] ">
                Launch App
              </Link>
            </div>
          </div>
          {isDropdownExpanded && (
            <div className={styles.dropdown_container}>
              <Link to="/app/chats" className={styles.dropdown_links}>
                Chats
              </Link>
              <Link to="/app/create" className={styles.dropdown_links}>
                Create
              </Link>
              <Link to="/app/explore" className={styles.dropdown_button}>
                Launch App
              </Link>
            </div>
          )}
          <hr className="absolute w-full bg-white h-[1px] opacity-10 margin-0 bottom-0 "/>
        </div>
      </div>

      <div className="flex flex-col  text-white pt-[80px] md:items-center lg:flex-row lg:items-start lg:max-w-[1440px] lg:py-[8%]">
        <div className= "flex flex-col items-start justify-center max-w-[720px] pl-[30px] pr-[40px] md:max-w-[750px] lg:w-[50%] lg:text-start lg:items-start lg:pt-[20px]">
          <h1 className="text-4xl pb-[35px] text-[var(--primary-light)] lg:text-6xl">
            Where Characters <br /> Do
            <span className="font-[Geist-Bold]"> Whatever</span> You Want
          </h1>
          <h3 className="text-2xl pt-0 pb-[25px] font-[Geist-Light] text-[var(--secondary-light)] lg:text-3xl ">
            Spicy conversation with your favorite characters, completely
            uncensored.
          </h3>
          <Link className="pt-[10px] no_underline" to="/app/create">
            <div className={styles.start_chatting_button}>
              <h4 className="text-lg lg:text-xl">Get Started</h4>
            </div>
          </Link>
        </div>
        <Scroller />
      
      </div>
      <div className={styles.feature_container}>
        <h1 className="text-white text-3xl font-[Geist-Bold]">FEATURES</h1>
        <FeatureGrid />
      </div>

      <div className={styles.faq_container}>
          <h1>Frequently Asked Questions</h1>
          <FAQ />
 
      </div>
      <div className={styles.footer_container}>
        Footer
      </div>
    </div>
  );
}

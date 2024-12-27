import React from "react";
import close_icon from "../../assets/close_icon.svg";
import { CSSTransition } from "react-transition-group";
import "./modal.css";

type LayoutProps = {
  title: string;
  subtitle: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  titleBorder?: boolean
};

const ModalComponent = ({
  onClose,
  isOpen,
  title,
  subtitle,
  children,
  titleBorder,
}: LayoutProps) => {
  return (
    <>
      <CSSTransition
        in={isOpen}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div
          className="modal 
            overflow-y-auto remove-scroll overflow-x-hidden bg-[#262626]
            bg-opacity-85 fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full
            opacity-0 transition-all duration-[0.3s]"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-8 w-full max-w-xl h-full md:h-auto mx-auto my-10 modal-content translate-y-[-200px] transition-all duration-[0.3s]"
          >
            {/* modal content */}
            <div className="relative bg-white rounded-[16px] overflow-hidden">
              {/* modal header */}
              <div className={`flex justify-between items-center px-6 py-5 ${titleBorder ? 'border-b border-[#E5E5E5] bg-[#F7F7F7]' : ''}`}>
                <div>
                  <h3 className="text-base font-medium text-[#121212]">
                    {title}
                  </h3>
                </div>

                <div className="cursor-pointer flex w-[30px] h-[30px] justify-center items-center border border-[#D2D2D2] rounded-full" onClick={onClose}>
                  <img src={close_icon} alt="close icon" className="w-[10px] h-[10px]" />
                </div>
              </div>

              {/* modal body */}
              <div>{children}</div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalComponent;
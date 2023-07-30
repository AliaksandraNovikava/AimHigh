import { StyledCloseButton } from "../NewGoalDetails";
import { NavBar } from "../Navigation";
import Button from "@/components/Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { StyledModalBody, StyledModal, StyledOverlay } from "../Modal";

export default function Header() {
  const [isHeaderModalOpen, setHeaderModalOpen] = useState(false);
  const [isHeaderEditing, setHeaderEditing] = useState(false);
  const [greeting, setGreeting] = useLocalStorageState("user greeting", {
    defaultValue: "User",
  });

  function handleOpenHeaderModal() {
    setHeaderModalOpen(true);
    console.log("after ModalOpen:", isHeaderModalOpen);
  }

  useEffect(() => {
    console.log("Updated ModalOpen:", isHeaderModalOpen);
  }, [isHeaderModalOpen]);

  function handleCloseHeaderModal(event) {
    event.stopPropagation();
    setHeaderModalOpen(false);
    console.log("after ModalClose:", isHeaderModalOpen);
    setHeaderEditing(false);
  }

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === "Escape" && isHeaderModalOpen) {
        handleCloseHeaderModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  });

  function handleSaveHeader() {
    setHeaderEditing(false);
  }

  function handleEdit() {
    setHeaderEditing(true);
  }

  return (
    <>
      <NavBar
        top="0"
        onClick={handleOpenHeaderModal}
        boxshadow="0px 1px 11px rgba(58, 72, 80, 0.07), 0px -2px 11px -1px rgba(176, 189, 197, 0.12)"
      >
        <div>
          <Image
            src="/icons/icons8-waving-hand-emoji-48.png"
            alt="waving hand"
            width={29}
            height={29}
          />
        </div>
        <div>Hi {greeting}!</div>
        <div>
          <Image
            src="/icons/icons8-fuchs-96.png"
            alt="profile image"
            width={30}
            height={30}
          />
        </div>
      </NavBar>
      {isHeaderModalOpen && (
        <StyledModalBody>
          <StyledModal position="fixed" top="10%">
            <StyledCloseButton onClick={handleCloseHeaderModal}>
              ⨉
            </StyledCloseButton>
            <Image
              src="/icons/icons8-fuchs-96.png"
              alt="profile image"
              width={40}
              height={40}
            />
            {isHeaderEditing ? (
              <>
                <span>
                  Hi{" "}
                  <input
                    type="text"
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                  />{" "}
                  !
                </span>
                <Button onClick={handleSaveHeader}>Save</Button>
              </>
            ) : (
              <>
                <h2>Hi {greeting}!</h2>
                <Button onClick={handleEdit}>Edit</Button>
              </>
            )}
            <p>Short app description goes here.</p>
          </StyledModal>
          <StyledOverlay onClick={handleCloseHeaderModal} />
        </StyledModalBody>
      )}
    </>
  );
}

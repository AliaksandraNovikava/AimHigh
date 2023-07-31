import { StyledCloseButton } from "../NewGoalDetails/NewGoalDetails";
import { EmptyStateMessage } from "@/pages/statistics";
import { Input } from "../NewGoalForm";
import { NavBar } from "../Navigation";
import Button from "@/components/Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { StyledModalBody, StyledModal, StyledOverlay } from "../Modal";
import styled from "styled-components";

const GreetingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Greeting = styled.p`
  margin: 0;
`;

const ProfileImage = styled.div`
  background-color: #e1d0e9;
  padding: 8px 6px 2px;
  border-radius: 50%;
`;

export default function Header() {
  const [isHeaderModalOpen, setHeaderModalOpen] = useState(false);
  const [isHeaderEditing, setHeaderEditing] = useState(false);
  const [greeting, setGreeting] = useLocalStorageState("user greeting", {
    defaultValue: "User",
  });

  function handleOpenHeaderModal() {
    setHeaderModalOpen(true);
  }

  function handleCloseHeaderModal(event) {
    event.stopPropagation();
    setHeaderModalOpen(false);
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
      <NavBar onClick={handleOpenHeaderModal}>
        <GreetingBox>
          <Image
            src="/icons/icons8-waving-hand-emoji-48.png"
            alt="waving hand"
            width={29}
            height={29}
          />
          <Greeting>
            Hi <strong>{greeting}</strong>
          </Greeting>
        </GreetingBox>
        <ProfileImage>
          <Image
            src="/icons/icons8-fuchs-96.png"
            alt="profile image"
            width={30}
            height={30}
          />
        </ProfileImage>
      </NavBar>
      {isHeaderModalOpen && (
        <StyledModalBody>
          <StyledModal position="fixed" top="10%">
            <StyledCloseButton onClick={handleCloseHeaderModal}>
              ⨉
            </StyledCloseButton>
            <ProfileImage>
              <Image
                src="/icons/icons8-fuchs-96.png"
                alt="profile image"
                width={40}
                height={40}
              />
            </ProfileImage>
            {isHeaderEditing ? (
              <>
                <h2>
                  Hi{" "}
                  <Input
                    type="text"
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                  />
                </h2>
                <Button onClick={handleSaveHeader}>Save your name</Button>
              </>
            ) : (
              <>
                <h2>Hi {greeting}</h2>
                <Button onClick={handleEdit}>Change your name</Button>
              </>
            )}
            <EmptyStateMessage>
              <strong>AimHigh</strong> is a powerful goal-setting and personal
              development app designed to help you reach new heights in your
              life. Whether you want to improve your health, career, or personal
              relationships, <strong>AimHigh</strong> provides the tools and
              motivation to help you succeed.
            </EmptyStateMessage>
          </StyledModal>
          <StyledOverlay onClick={handleCloseHeaderModal} />
        </StyledModalBody>
      )}
    </>
  );
}

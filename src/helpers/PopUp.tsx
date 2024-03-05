import React, { useState, forwardRef, useImperativeHandle, PropsWithChildren } from "react";
import { BlurView } from "expo-blur";
import { isFunction } from "lodash";
import { Div, P, Touchable } from "../helpers/StyledElements";
import { Animated, Modal, ScrollView } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, hp } from "../helpers/PixelCalculator";

interface PopupProps extends PropsWithChildren {
  showOk?: boolean;
  onConfirm?: Function;
  confirmColor?: string;
  onClose?: Function;
  confirmTitle?: string;
  showConfirm?: boolean;
  background?: string;
  confirmCondition?: boolean;
  hideCancel?: boolean;
  forced?: boolean;
}

type PopupRef = {
  open: Function;
  close: Function;
};

const Popup = forwardRef<PopupRef, PopupProps>((props: PopupProps, ref) => {
  const {
    children,
    onConfirm,
    onClose,
    showOk,
    confirmColor = "interaction",
    confirmTitle = "save",
    showConfirm = false,
    background = "bluredHover",
    confirmCondition = true,
    hideCancel = false,
    forced = false,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const yVal = new Animated.Value(0);

  function handleClose() {
    !forced && setOpenModal(false);
    if (isFunction(onClose)) onClose();
  }
  function handleOpen() {
    setOpenModal(true);
    Animated.timing(yVal, {
      toValue: -SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  function handleConfirm() {
    if (isFunction(onConfirm)) onConfirm();
    handleClose();
  }

  useImperativeHandle(ref, () => ({
    open() {
      handleOpen();
    },
    close() {
      handleClose();
    },
  }));

  return (
    <Modal animationType="fade" transparent onRequestClose={handleClose} visible={openModal}>
      <Div styles="fullScreen flexBox contentCenter">
        <BlurView
          intensity={30}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            position: "absolute",
          }}
        />
        <Div styles={`bg-${background} rounded-10 w-281 maxH-450 overflow-hidden`}>
          {contentHeight >= hp(244) ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: hp(10) }}
              onLayout={(layout) => setContentHeight(layout.nativeEvent.layout.height + hp(44))}>
              <Div>{children}</Div>
            </ScrollView>
          ) : (
            <Div
              styles="ph-10 pv-10"
              onLayout={(layout) => setContentHeight(layout.nativeEvent.layout.height + hp(44))}>
              <Div>{children}</Div>
            </Div>
          )}
          <Div styles="row w-281 h-44">
            {!hideCancel && (
              <Touchable
                onPress={handleClose}
                styles="flexBox borderTop-1 borderColor-seperator contentCenter">
                {showOk ? (
                  <Div styles="size-15 medium c-interaction text-center font">
                    <P>Onayla</P>
                  </Div>
                ) : (
                  <Div styles="size-15 medium c-disabled text-center font">
                    <P>Vazgeç</P>
                  </Div>
                )}
              </Touchable>
            )}
            {showConfirm && (
              <Touchable
                onPress={() => (confirmCondition ? handleConfirm() : null)}
                styles={`flexBox borderTop-1 ${
                  !hideCancel && "borderLeft-1"
                } borderColor-seperator contentCenter`}>
                <Div
                  styles={`size-15 medium font c-${
                    confirmCondition ? confirmColor : "disabled"
                  } text-center`}>
                  <P>{confirmTitle}</P>
                </Div>
              </Touchable>
            )}
          </Div>
        </Div>
      </Div>
    </Modal>
  );
});

export default Popup;

import React, { useState, forwardRef, useImperativeHandle, PropsWithChildren, useRef } from "react";
import { BlurView } from "expo-blur";
import { isFunction } from "lodash";
import { Animated, Modal, ScrollView } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, hp } from "../helpers/PixelCalculator";
import { Div, P, Touchable } from "../helpers/StyledElements";

interface DialogProps extends PropsWithChildren {
  onConfirm?: Function;
  onClose?: Function;
  confirmTitle?: string;
  showConfirm?: boolean;
  background?: string;
}

type DialogRef = {
  open: Function;
  close: Function;
};

const Dialog = forwardRef<DialogRef, DialogProps>((props: DialogProps, ref) => {
  const {
    children,
    onConfirm,
    onClose,
    confirmTitle = "Kaydet",
    showConfirm = false,
    background = "bluredHover",
  } = props;
  const [openModal, setOpenModal] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);
  const yVal = useRef(new Animated.Value(0)).current;

  function handleClose() {
    Animated.timing(yVal, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setOpenModal(false);
      if (isFunction(onClose)) onClose();
    }, 200);
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
    openModal && (
      <Modal animationType="fade" transparent onRequestClose={handleClose} visible>
        <Div styles="fullScreen flexBox contentEnd">
          <Touchable styles="fullScreen absolute">
            <BlurView
              intensity={30}
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                position: "absolute",
              }}
            />
          </Touchable>
          <Animated.View
            style={[
              { position: "absolute", bottom: -SCREEN_HEIGHT, flex: 1 },
              { transform: [{ translateY: yVal }] },
            ]}>
            <Div
              styles={`bg-${background} ph-10 roundTopLeft-10 roundTopRight-10 flexBox maxH-700`}>
              <Div styles="h-3 w-96 bg-antrasit mt-10 rounded-10 items-center contentCenter center " />
              <Div styles="row w-355 center ph-10 rounded-10 pv-4 mv-10 items-center">
                <Touchable styles="flexBox" onPress={handleConfirm}>
                  {showConfirm && (
                    <P elipsis styles="c-interaction size-13 text-right">
                      {confirmTitle}
                    </P>
                  )}
                </Touchable>
              </Div>
              {contentHeight >= hp(700) ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                  contentContainerStyle={{ paddingBottom: hp(44) }}>
                  <Div
                    onLayout={(layout) =>
                      setContentHeight(layout.nativeEvent.layout.height + hp(44))
                    }>
                    {children}
                  </Div>
                </ScrollView>
              ) : (
                <Div
                  styles="pb-44"
                  onLayout={(layout) =>
                    setContentHeight(layout.nativeEvent.layout.height + hp(44))
                  }>
                  {children}
                </Div>
              )}
            </Div>
          </Animated.View>
        </Div>
      </Modal>
    )
  );
});

export default Dialog;

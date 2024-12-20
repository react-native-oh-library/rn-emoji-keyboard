/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */
import { useCallback, useEffect, useState } from 'react'
import { Keyboard, type KeyboardEvent,type KeyboardEventName,Platform } from 'react-native'

export const useKeyboard = (isOpen: boolean) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [keyboardshowType,setKeyboardshowType]=useState<KeyboardEventName>('keyboardWillShow')
  const [keyboardhideType,setKeyboardhideType]=useState<KeyboardEventName>('keyboardWillHide')
  const onKeyboardWillShow = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      setKeyboardHeight(e.endCoordinates.height)
      setKeyboardVisible(true)
    },
    [isOpen],
  )

  const onKeyboardWillHide = useCallback(() => {
    setKeyboardHeight(0)
    setKeyboardVisible(false)
  }, [])

  useEffect(() => {
    if(Platform.OS as string==='harmony'){
      setKeyboardshowType('keyboardDidShow')
      setKeyboardhideType('keyboardDidHide')
    }
    const showSubscription = Keyboard.addListener(keyboardshowType, onKeyboardWillShow)
    const hideSubscription = Keyboard.addListener(keyboardhideType, onKeyboardWillHide)
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [onKeyboardWillHide, onKeyboardWillShow])

  return { keyboardVisible, keyboardHeight }
}

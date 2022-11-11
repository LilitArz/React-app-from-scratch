import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { isEmptyObject } from 'util'
import { MOBILE_SCREEN_SIZE } from 'consts'

/**
 * Calls given callback when click target is not a descendant of used ref.
 * @param {Function} cb Which is called when we detect outside click from given refed element.
 */
export const useBackdropClick = (cb, selectorArr) => {
    const ref = useRef(null)
    let isMouseDownOnModal = false

    const checkIsOnOutside = (e) => {
        const selectors = selectorArr
            ? selectorArr.map((selector) => document.querySelector(selector))
            : []

        const hasPreventedSelector = selectors.some((selector) => {
            return selector ? selector.contains(e.target) : false
        })

        return (
            !!ref &&
            !!ref.current &&
            !ref.current.contains(e.target) &&
            !hasPreventedSelector
        )
    }

    const onMouseUp = (e) => {
        const isMouseUpOutside = checkIsOnOutside(e)
        if (!isMouseDownOnModal && isMouseUpOutside) {
            return cb(e)
        }
    }

    const onMouseDown = (e) => {
        isMouseDownOnModal = !checkIsOnOutside(e)
    }

    useEffect(() => {
        if (document.body) {
            document.body.addEventListener('mousedown', onMouseDown)
            document.body.addEventListener('mouseup', onMouseUp)
            document.body.addEventListener('touchstart', onMouseDown)
            document.body.addEventListener('touchend', onMouseUp)
        }
        return () => {
            if (document.body) {
                document.body.removeEventListener('mousedown', onMouseDown)
                document.body.removeEventListener('mouseup', onMouseUp)
                document.body.removeEventListener('touchstart', onMouseDown)
                document.body.removeEventListener('touchend', onMouseUp)
            }
        }
    })

    return ref
}

export const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef(handler)
    useEffect(() => {
        savedHandler.current = handler
    }, [handler, savedHandler])

    useEffect(() => {
        const isSupported = element && element.addEventListener
        if (!isSupported) return

        const eventListener = (event) => savedHandler.current(event)
        element.addEventListener(eventName, eventListener)

        return () => {
            element.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element, savedHandler])
}

export const useWindowSize = (isMobileSize = false) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }
    useEventListener('resize', handleResize)
    isMobileSize && useEventListener('orientationchange', handleResize)

    return windowSize
}

export const useIsMobile = (size = MOBILE_SCREEN_SIZE) => {
    const isMobileSize = true
    const windowSize = useWindowSize(isMobileSize)
    return windowSize.width <= size
}

const keysMapping = {
    enter: 13,
    shift: 16,
    escape: 27,
    z: 90,
    delete: 46,
    backspace: 8,
    t: 84,
    plus: 187,
    minus: 189,
    c: 67,
    v: 86,
    x: 88,
    arrowLeft: 37,
    arrowUp: 38,
    arrowRight: 39,
    arrowDown: 40,
}

const checkMetaKeys = (configs, eventKeys) => {
    if (!configs || isEmptyObject(configs)) return true
    if (configs.shiftKey && configs.metaKey) {
        return !!(
            eventKeys.shiftKey &&
            (eventKeys.metaKey || eventKeys.ctrlKey)
        )
    }
    if (configs.shiftKey) {
        return !!(
            eventKeys.shiftKey && !(eventKeys.metaKey || eventKeys.ctrlKey)
        )
    }
    if (configs.metaKey) {
        return !!(
            !eventKeys.shiftKey &&
            (eventKeys.metaKey || eventKeys.ctrlKey)
        )
    }
    return false
}

export const useKeyPress = (targetKey, handler, configs) => {
    const keyDownHandler = (event) => {
        const { charCode, keyCode, shiftKey, ctrlKey, metaKey } = event
        const code = charCode || keyCode

        if (
            code === keysMapping[targetKey] &&
            checkMetaKeys(configs, { shiftKey, ctrlKey, metaKey })
        ) {
            handler(event)
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler)
        return () => {
            window.removeEventListener('keydown', keyDownHandler)
        }
    }, [handler, targetKey, configs])
}
export const useEscKeyPress = (handler) => useKeyPress('escape', handler)

export const useShiftEnterKeyPress = (handler) =>
    useKeyPress('enter', handler, { shiftKey: true })

export const useEnterKeyPress = (handler) => useKeyPress('enter', handler)

export const useArrowUpKeyPress = (handler) => useKeyPress('arrowUp', handler)
export const useArrowDownKeyPress = (handler) =>
    useKeyPress('arrowDown', handler)

export const useRefForTooltip = (ref) => {
    const [refForTooltip, setRefForTooltip] = useState(null)

    useLayoutEffect(() => {
        setRefForTooltip(ref.current)
    }, [ref, ref.current])

    if (refForTooltip) {
        return refForTooltip
    }
    return null
}

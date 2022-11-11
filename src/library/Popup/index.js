import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import CloseIcon from '@material-ui/icons/Close'
import { AnimatePresence } from 'framer-motion'
import { useBackdropClick, useIsMobile, useEscKeyPress } from 'hooks'
import { MOBILE_ANIMATION, DESKTOP_ANIMATION } from './animations'
import * as Styled from './styled'

const Popup = ({
    isOpen,
    onClose,
    children,
    withPadding = true,
    className,
    showCloseButton = true,
    showMobileFromBottom = true,
    isFullScreen = false,
    animationSpeed,
    backgroundColor,
}) => {
    const picker = useBackdropClick(onClose, [
        '.dropdown-items-container',
        '.MuiPopover-root',
    ])
    const isMobile = useIsMobile()
    const showFromBottom = isMobile && showMobileFromBottom
    useEscKeyPress(onClose)
    useEffect(() => {
        if (isOpen && document.body) {
            document.body.style.overflowY = 'hidden'
        }
        return () => {
            if (isOpen && document.body) {
                document.body.style.overflowY = 'initial'
            }
        }
    }, [isOpen])

    return (
        document.body &&
        createPortal(
            <AnimatePresence>
                {isOpen && (
                    <Styled.Container
                        initial={{
                            backgroundColor: '#fff',
                            opacity: 0,
                        }}
                        animate={{
                            backgroundColor: 'rgba(37,46,72,0.5)',
                            opacity: [0.5, 1],
                        }}
                        transition={{ duration: 0.1 }}
                    >
                        <Styled.PopupContent
                            ref={picker}
                            isFullScreen={isFullScreen}
                            className={className}
                            {...MOBILE_ANIMATION(
                                isFullScreen,
                                showFromBottom,
                                animationSpeed
                            )}
                            fromBottom={showFromBottom}
                        >
                            <Styled.AnimatePresenceContent
                                withPadding={withPadding}
                                fromBottom={showFromBottom}
                                isFullScreen={isFullScreen}
                                {...(!showFromBottom
                                    ? DESKTOP_ANIMATION(animationSpeed)
                                    : {})}
                                backgroundColor={backgroundColor}
                            >
                                {showCloseButton && (
                                    <Styled.CloseIcon
                                        onClick={onClose}
                                        withPadding={withPadding}
                                        isFullScreen={isFullScreen}
                                    >
                                        <CloseIcon />
                                    </Styled.CloseIcon>
                                )}
                                {children}
                            </Styled.AnimatePresenceContent>
                        </Styled.PopupContent>
                    </Styled.Container>
                )}
            </AnimatePresence>,
            document.body
        )
    )
}

export default Popup

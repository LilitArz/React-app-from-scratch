export const MOBILE_ANIMATION = (
    isFulllScreen,
    showFromBottom,
    animationoDuration = 0.4
) => {
    if (!showFromBottom) {
        return {}
    }
    return {
        initial: { height: 0, bottom: 0 },
        animate: {
            height: isFulllScreen ? '100%' : 'auto',
            bottom: isFulllScreen ? 0 : 10,
        },
        exit: { height: 0, bottom: 0 },
        transition: { duration: animationoDuration },
    }
}

export const DESKTOP_ANIMATION = (animationoDuration = 0.4) => {
    return {
        initial: { opacity: 0.5, scale: 0.7 },
        animate: { opacity: 1, scale: [0.8, 1.1, 1] },
        exit: {
            opacity: 0,
            scale: 0,
            transition: {
                duration: 0.3,
            },
        },
        transition: {
            duration: animationoDuration,
            type: 'spring',
            damping: 55,
            stiffness: 700,
        },
    }
}

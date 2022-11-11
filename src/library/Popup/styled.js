import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { MOBILE_SCREEN_SIZE } from 'consts'

export const Container = styled(motion.div)`
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 101;
    top: 0;
    background: rgba(54, 63, 90, 0.5);
`

export const PopupContent = styled(motion.div)`
    display: flex;
    justify-content: center;
    position: absolute;
    ${({ fromBottom, isFullScreen }) => {
        if (fromBottom && isFullScreen) {
            return css`
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgb(255, 255, 255);
            `
        }
        if (fromBottom) {
            return css`
                position: fixed;
                bottom: 30px;
                left: 10px;
                right: 10px;
                border-radius: 10px;
                background: rgb(255, 255, 255);
            `
        }
        return css`
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `
    }};
`

export const AnimatePresenceContent = styled(motion.div)`
    ${({ withPadding }) =>
        withPadding &&
        css`
            padding: 30px 20px;
        `}
    width: 100%
    box-shadow: 0px 3px 10px #0052e026
    background-color: #fff
    border-radius: 10px
    overflow: hidden
    ${(props) =>
        props.backgroundColor &&
        css`
            background: ${props.backgroundColor};
        `}
    @media screen and (max-width: ${MOBILE_SCREEN_SIZE}px) {
        ${({ isFullScreen }) =>
            isFullScreen &&
            css`
                border-radius: 0;
                overflow: auto;
            `}
    }
`

export const CloseIcon = styled.div`
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
    text-align: right;
    @media screen and (max-width: ${MOBILE_SCREEN_SIZE}px) {
        padding: 10px;
        ${({ isFullScreen }) =>
            isFullScreen &&
            css`
                position: unset;
                & > div {
                    justify-content: flex-end;
                }
            `}
    }
`

import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    HTMLAttributes,
    useState,
} from 'react'
import s from './SuperEditableSpan.module.css'
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText'
import editIcon from './editIcon.svg'

// Определяем тип для стандартных пропсов инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// Определяем тип для стандартных пропсов спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// Определяем тип для пропсов SuperEditableSpan
type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanProps?: DefaultSpanPropsType & { defaultText?: string } // Пропсы для спана
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
                                                                autoFocus,
                                                                onBlur,
                                                                onEnter,
                                                                spanProps,
                                                                ...restProps // Все остальные пропсы
                                                            }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false) // Выключаем режим редактирования при нажатии Enter
        onEnter?.()
    }

    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false) // Выключаем режим редактирования при потере фокуса
        onBlur?.(e)
    }

    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true) // Включаем режим редактирования при двойном клике
        onDoubleClick?.(e)
    }

    const spanClassName = s.span + (className ? ' ' + className : '')

    return (
        <>
            {editMode ? (
                <SuperInputText
                    autoFocus={autoFocus || true}
                    onBlur={onBlurCallback}
                    onEnter={onEnterCallback}
                    className={s.input}
                    {...restProps} // Передаем остальные пропсы инпуту
                />
            ) : (
                <div className={s.spanBlock}>
                    <img
                        src={editIcon}
                        className={s.pen}
                        alt={'edit'}
                    />
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}
                        {...restSpanProps} // Передаем остальные пропсы спану
                    >
                        {children || restProps.value || defaultText} {/* Отображаем детей, значение инпута или текст по умолчанию */}
                    </span>
                </div>
            )}
        </>
    )
}

export default SuperEditableSpan

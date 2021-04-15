import React, { useCallback, useState } from 'react'
import styled from '../../../../../lib/v2/styled'
import { AppComponent, ControlButtonProps } from '../../../../../lib/v2/types'
import cc from 'classcat'
import { overflowEllipsis } from '../../../../../lib/v2/styled/styleFunctions'
import Button from '../../../atoms/Button'
import { mdiChevronDown, mdiChevronRight, mdiDotsHorizontal } from '@mdi/js'
import { Emoji } from 'emoji-mart'
import Icon from '../../../atoms/Icon'
import FoldingWrapper, { FoldingProps } from '../../../atoms/FoldingWrapper'
import {
  MenuItem,
  useContextMenu,
} from '../../../../../lib/v2/stores/contextMenu'

interface SidebarTreeItemProps {
  defaultIcon?: string
  depth: number
  emoji?: string
  folded?: boolean
  folding?: FoldingProps
  id?: string
  label: string
  labelHref?: string
  labelClick?: () => void
  controls?: ControlButtonProps[]
  contextControls?: MenuItem[]
  active?: boolean
}

interface SharedProps {
  focused: boolean
  setFocused: React.Dispatch<boolean>
}

const SidebarItem: AppComponent<SidebarTreeItemProps & SharedProps> = ({
  className,
  depth,
  defaultIcon,
  emoji,
  focused,
  folding,
  folded,
  id,
  label,
  labelHref,
  labelClick,
  setFocused,
  controls,
  contextControls,
  active,
}) => {
  const { popup } = useContextMenu()
  const LabelTag = labelHref != null ? 'a' : 'button'
  const unfocusOnBlur = (event: any) => {
    if (
      document.activeElement == null ||
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      setFocused(false)
    }
  }

  const onClick: React.MouseEventHandler = useCallback(
    (event) => {
      if (labelClick == null) {
        return
      }
      event.preventDefault()
      labelClick()
    },
    [labelClick]
  )

  return (
    <Container
      depth={depth > 6 ? 6 : depth}
      className={cc([
        className,
        'sidebar__tree__item',
        focused && 'focused',
        active && 'sidebar__tree__item--active',
      ])}
      onBlur={unfocusOnBlur}
    >
      <div className='sidebar__tree__item__wrapper' draggable={false}>
        {folded != null && (
          <Button
            variant='icon'
            iconSize={16}
            iconPath={folded ? mdiChevronRight : mdiChevronDown}
            className='sidebar__tree__item__icon'
            size='sm'
            onClick={folding?.toggle}
          />
        )}
        <LabelTag
          className='sidebar__tree__item__label'
          onFocus={() => setFocused(true)}
          onClick={onClick}
          href={labelHref}
          id={`tree-${id}`}
          tabIndex={1}
          draggable={false}
        >
          {emoji != null ? (
            <Emoji emoji={emoji} set='apple' size={16} />
          ) : defaultIcon != null ? (
            <Icon path={defaultIcon} size={16} />
          ) : null}
          <span className='sidebar__tree__item__label__ellipsis'>{label}</span>
        </LabelTag>
        {(controls != null || contextControls != null) && (
          <div className='sidebar__tree__item__controls'>
            {(controls || []).map((control, i) => (
              <Button
                key={i}
                variant='icon'
                iconSize={16}
                iconPath={control.icon}
                tabIndex={-1}
                className='sidebar__tree__item__control'
                size='sm'
                onClick={control.onClick}
              />
            ))}
            {contextControls != null && (
              <Button
                variant='icon'
                iconSize={16}
                iconPath={mdiDotsHorizontal}
                tabIndex={-1}
                className='sidebar__tree__item__control'
                size='sm'
                onClick={(event) => popup(event, contextControls)}
              />
            )}
          </div>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div<{ depth: number }>`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 26px;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.sizes.fonts.sm}px;

  .sidebar__tree__item__controls {
    min-width: 0;
    display: none;
    flex: 0 0 auto;
    justify-content: flex-end;
    position: relative;
    padding: 0 ${({ theme }) => theme.sizes.spaces.sm}px;
    align-items: center;
    flex-shrink: 0;

    button {
      display: flex;
      padding: 0 ${({ theme }) => theme.sizes.spaces.xsm}px;
      font-size: inherit;
      margin: 0;
    }
  }

  &:hover .sidebar__tree__item__controls,
  &.focused .sidebar__tree__item__controls,
  &.sidebar__category .sidebar__tree__item__controls {
    display: flex;
    align-items: baseline;
  }

  .sidebar__tree__item__wrapper {
    width: 100%;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding-left: ${({ depth }) => 13 + (depth as number) * 10}px;
  }

  a[href].sidebar__tree__item__label {
    cursor: pointer;
  }

  .sidebar__tree__item__label {
    font-size: ${({ theme }) => theme.sizes.fonts.sm}px;
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    background: none;
    outline: 0;
    border: 0;
    text-align: left;
    color: ${({ theme }) => theme.colors.text.primary};
    padding: 2px 0;
    text-decoration: none;
    margin: 0;
    overflow: hidden;
    svg {
      color: ${({ theme }) => theme.colors.text.link};
    }
    .sidebar__tree__item__label__ellipsis {
      padding-left: ${({ theme }) => theme.sizes.spaces.xsm}px;
      padding-right: ${({ theme }) => theme.sizes.spaces.df}px;
      ${overflowEllipsis};
    }
  }

  .sidebar__tree__item__icon {
    flex: 0 0 auto;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  &:not(.sidebar__category) {
    font-size: ${({ theme }) => theme.sizes.fonts.sm}px;
    &:active,
    &.sidebar__tree__item--active {
      background-color: ${({ theme }) => theme.colors.variants.primary.base};
    }

    &:focus,
    &.focused {
      background-color: ${({ theme }) => theme.colors.background.tertiary};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.background.quaternary};
    }
  }

  &.sidebar__category {
    border-bottom: 1px solid transparent;
    .sidebar__tree__item__label {
      text-transform: uppercase !important;
    }

    .sidebar__tree__item__icon {
      color: currentColor !important;
    }
    &.focused {
      background-color: ${({ theme }) => theme.colors.background.tertiary};
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.background.quaternary};
    }

    &:not(.sidebar__category--last):not(.sidebar__category--open) {
      border-color: ${({ theme }) => theme.colors.border.second};
    }
  }
`

const SidebarTreeItem: AppComponent<SidebarTreeItemProps> = ({
  folding,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  if (folding != null) {
    return (
      <FoldingWrapper
        fold={folding.fold}
        unfold={folding.unfold}
        focused={focused}
      >
        <SidebarItem
          focused={focused}
          setFocused={setFocused}
          folding={folding}
          {...props}
        />
      </FoldingWrapper>
    )
  }
  return (
    <SidebarItem
      focused={focused}
      setFocused={setFocused}
      folding={folding}
      {...props}
    />
  )
}

export default SidebarTreeItem

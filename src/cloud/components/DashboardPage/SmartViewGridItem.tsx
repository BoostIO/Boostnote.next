import React from 'react'
import styled from '../../../design/lib/styled'
import cc from 'classcat'
import { SerializedSmartView } from '../../interfaces/db/smartView'
import { overflowEllipsis } from '../../../design/lib/styled/styleFunctions'
import { DashboardView } from './DashboardView'
import { SerializedTeam } from '../../interfaces/db/team'
import { useMemo } from 'react'
import { buildSmartViewQueryCheck } from '../../lib/smartViews'
import { useNav } from '../../lib/stores/nav'
import { getMapValues } from '../../../design/lib/utils/array'
import Button, { LoadingButton } from '../../../design/components/atoms/Button'
import { mdiArrowExpand, mdiCog, mdiTrashCan } from '@mdi/js'

interface SmartViewGridItemProps {
  className?: string
  smartview: SerializedSmartView
  currentUserIsCoreMember: boolean
  team: SerializedTeam
  controls?: React.ReactNode
}

const SmartViewGridItem = ({
  smartview,
  className,
  currentUserIsCoreMember,
  team,
  controls,
}: SmartViewGridItemProps) => {
  const { docsMap } = useNav()

  const smartViewDocs = useMemo(() => {
    return getMapValues(docsMap).filter(
      buildSmartViewQueryCheck(smartview.condition)
    )
  }, [docsMap, smartview.condition])

  return (
    <Container className={cc(['sv__item', className])}>
      <div className='sv__item__header'>
        <span className='sv__item__title'>{smartview.name}</span>
        {controls != null && (
          <div className='sv__item__controls'>{controls}</div>
        )}
      </div>
      <div className='sv__item__content'>
        <div className='sv__item__content__wrapper'>
          <DashboardView
            view={smartview.view}
            currentUserIsCoreMember={currentUserIsCoreMember}
            team={team}
            docs={smartViewDocs}
          />
        </div>
      </div>
    </Container>
  )
}

export const SmartViewGridItemControls = ({
  state,
  onExpand,
  onEdit,
  onDelete,
}: {
  state?: string
  onExpand: () => void
  onEdit: () => void
  onDelete: () => void
}) => {
  return (
    <>
      <Button
        variant='icon'
        size='sm'
        iconPath={mdiArrowExpand}
        onClick={onExpand}
      />
      <LoadingButton
        variant='icon'
        size='sm'
        iconPath={mdiCog}
        disabled={state != null}
        spinning={state === 'update'}
        onClick={onEdit}
      />
      <LoadingButton
        variant='icon'
        size='sm'
        iconPath={mdiTrashCan}
        disabled={state != null}
        spinning={state === 'delete'}
        onClick={onDelete}
      />
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borders.radius}px;

  &.sv__item--fullscreen {
    position: fixed;
    width: 96vw !important;
    height: 90vh !important;
  }

  &:hover {
    .sv__item__controls {
      display: flex;
    }
  }

  .sv__item__header {
    padding: ${({ theme }) => theme.sizes.spaces.xsm}px
      ${({ theme }) => theme.sizes.spaces.sm}px;
    height: 32px;
    flex: 0 0 auto;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.second};
    overflow: hidden;
  }

  .sv__item__title {
    ${overflowEllipsis}
  }

  .sv__item__controls {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin: 0 ${({ theme }) => theme.sizes.spaces.xsm}px;

    > * {
      margin: 0;
    }
  }

  .sv__item__content {
    width: 100%;
    flex: 1 1 auto;
    overflow: hidden;
  }

  .sv__item__content__wrapper {
    width: 90vw;
    height: 90vh;
  }
`

export default SmartViewGridItem

import { MandalaChart, MandalaCell } from '../types'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validateChart = (chart: MandalaChart): ValidationResult => {
  const errors: string[] = []

  // 驗證基本屬性
  if (!chart.id || chart.id.trim().length === 0) {
    errors.push('圖表ID不能為空')
  }

  if (!chart.title || chart.title.trim().length === 0) {
    errors.push('圖表標題不能為空')
  }

  if (chart.title && chart.title.length > 100) {
    errors.push('圖表標題不能超過100個字符')
  }

  // 驗證單元格
  if (!chart.cells || !Array.isArray(chart.cells)) {
    errors.push('圖表必須包含單元格數組')
  } else {
    if (chart.cells.length !== 9) {
      errors.push('圖表必須包含9個單元格')
    }

    // 驗證必需的位置
    const requiredPositions = [
      'center', 'top', 'top-right', 'right', 'bottom-right', 
      'bottom', 'bottom-left', 'left', 'top-left'
    ]
    
    const presentPositions = chart.cells.map(cell => cell.position)
    const missingPositions = requiredPositions.filter(pos => 
      !presentPositions.includes(pos as any)
    )
    
    if (missingPositions.length > 0) {
      errors.push(`缺少必要的單元格位置: ${missingPositions.join(', ')}`)
    }

    // 驗證每個單元格
    chart.cells.forEach((cell, index) => {
      const cellErrors = validateCell(cell, index)
      errors.push(...cellErrors)
    })
  }

  // 驗證思考模式
  if (!chart.thinkingMode || !['radial', 'spiral', 'cross'].includes(chart.thinkingMode)) {
    errors.push('思考模式必須是 radial、spiral 或 cross')
  }

  // 驗證日期
  if (!chart.createdAt || !(chart.createdAt instanceof Date) || isNaN(chart.createdAt.getTime())) {
    errors.push('創建日期無效')
  }

  if (!chart.updatedAt || !(chart.updatedAt instanceof Date) || isNaN(chart.updatedAt.getTime())) {
    errors.push('更新日期無效')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateCell = (cell: MandalaCell, index?: number): string[] => {
  const errors: string[] = []
  const prefix = index !== undefined ? `單元格 ${index + 1}: ` : '單元格: '

  if (!cell.id || cell.id.trim().length === 0) {
    errors.push(`${prefix}ID不能為空`)
  }

  if (!cell.position) {
    errors.push(`${prefix}位置不能為空`)
  }

  if (cell.content && cell.content.length > 200) {
    errors.push(`${prefix}內容不能超過200個字符`)
  }

  return errors
}

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return ''
  }
  
  return input
    .trim() // 移除前後空白
    .replace(/\s+/g, ' ') // 將多個空白字符替換為單個空格
    .substring(0, 200) // 限制長度
}

export const sanitizeChart = (chart: MandalaChart): MandalaChart => {
  return {
    ...chart,
    title: sanitizeInput(chart.title),
    cells: chart.cells.map(cell => ({
      ...cell,
      content: sanitizeInput(cell.content)
    }))
  }
}
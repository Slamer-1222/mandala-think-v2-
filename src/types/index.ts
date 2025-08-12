export interface MandalaCell {
  id: string
  content: string
  position: 'center' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left'
  children?: MandalaChart[]
}

export interface MandalaChart {
  id: string
  title: string
  cells: MandalaCell[]
  createdAt: Date
  updatedAt: Date
  template?: string
  thinkingMode: 'radial' | 'spiral' | 'cross'
}

export interface Template {
  id: string
  name: string
  description: string
  category: 'creative' | 'planning' | 'analysis' | 'learning' | 'problem-solving'
  cells: Partial<MandalaCell>[]
  thinkingMode: 'radial' | 'spiral' | 'cross'
}

export interface User {
  id: string
  name: string
  email: string
  charts: MandalaChart[]
  templates: Template[]
}

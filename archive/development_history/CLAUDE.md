# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a modern React-based web application implementing the Mandala Thinking Method (曼陀羅思考法), a visual thinking tool based on Buddhist mandala imagery. The system provides an interactive nine-grid interface for structured brainstorming, problem-solving, and planning.

## Core Commands

### Development Commands
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build production version
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint on the codebase
- `npm run lint:fix` - Auto-fix ESLint issues

### Testing and Quality
- No testing framework currently configured
- ESLint configured for TypeScript and React

## Architecture Overview

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 4
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

### Key Components Architecture
- `src/App.tsx`: Main routing configuration
- `src/components/Layout.tsx`: Application layout wrapper
- `src/components/MandalaGrid.tsx`: Core nine-grid component
- `src/pages/`: Page components (Home, Editor, Templates, About)
- `src/store/mandalaStore.ts`: Zustand store with persistence
- `src/types/index.ts`: TypeScript type definitions

### Data Model Structure
```typescript
interface MandalaChart {
  id: string
  title: string
  cells: MandalaCell[]
  thinkingMode: 'radial' | 'spiral' | 'cross'
  createdAt: Date
  updatedAt: Date
  template?: string
}
```

## Three Thinking Modes

### 1. Radial Mode (放射狀)
- Used for creative brainstorming and idea generation
- Central theme with eight radiating related concepts
- Blue color scheme (#3B82F6)

### 2. Spiral Mode (螺旋狀)
- Used for step-by-step planning and execution
- Sequential flow from step 1-8 in clockwise direction
- Green color scheme (#10B981)
- Includes step numbering and flow visualization

### 3. Cross Mode (十字型)
- Used for systematic problem analysis using 5W1H method
- Structured analysis with What, Why, Who, When, Where, How
- Purple color scheme (#8B5CF6)
- Cross-shaped connection lines

## Built-in Templates

The system includes 5 pre-configured templates:
1. **Creative Template** (創意發想): For brainstorming sessions
2. **Planning Template** (目標設定): 8-step execution planning
3. **Analysis Template** (問題分析): 5W1H problem analysis
4. **Learning Template** (學習規劃): Systematic knowledge acquisition
5. **Project Template** (專案管理): Complete project lifecycle

## State Management

### Zustand Store Features
- Local storage persistence for charts and templates
- CRUD operations for charts and cells
- Template loading and saving
- Current chart state management

### Key Store Actions
- `createChart(title, template?)` - Create new mandala chart
- `updateCell(chartId, cellId, content)` - Update cell content
- `loadTemplate(templateId)` - Load predefined template
- `addChildChart(chartId, cellId)` - Add sub-mandala to cell

## Known Issues and Areas for Improvement

### 1. Missing Core Features
- **Export functionality**: No PNG/SVG/PDF export capabilities
- **Undo/Redo system**: No operation history management
- **Keyboard shortcuts**: No productivity shortcuts implemented
- **Data backup**: Limited to local storage, no export/import

### 2. Mobile Experience
- Basic responsive design but lacks touch optimizations
- No gesture support for mobile devices
- Cell editing UX could be improved on small screens

### 3. Performance Concerns
- No virtualization for large numbers of sub-charts
- No lazy loading for complex nested structures
- State updates could benefit from optimization

### 4. Error Handling
- No global error boundary implementation
- Limited data validation
- No graceful degradation for localStorage failures

### 5. Development Workflow
- No testing framework configured
- Missing component documentation
- No automated deployment setup

## Recommended Improvements

### High Priority
1. **Add export functionality** for charts (PNG, SVG, JSON formats)
2. **Implement undo/redo system** with operation history
3. **Add keyboard shortcuts** for common operations
4. **Improve mobile touch experience** with gesture support
5. **Add error boundaries** and better error handling

### Medium Priority
1. **Set up testing framework** (Jest + React Testing Library)
2. **Add performance optimizations** for large datasets
3. **Implement data validation** and sanitization
4. **Add loading states** and user feedback
5. **Create component documentation**

### Low Priority
1. **Add theme switching** (light/dark mode)
2. **Implement template categories** and search
3. **Add collaborative features** for team use
4. **Create tutorial/onboarding** experience
5. **Add analytics** for usage tracking

## Development Guidelines

### Code Style
- Follow existing TypeScript patterns
- Use functional components with hooks
- Maintain consistent naming conventions (PascalCase for components, camelCase for functions)
- Keep components focused and single-responsibility

### File Organization
- Components in `src/components/`
- Pages in `src/pages/`
- Types in `src/types/`
- Store logic in `src/store/`
- Shared utilities in dedicated directories

### State Management
- Use Zustand store for global state
- Implement proper TypeScript typing
- Maintain immutable state updates
- Use persistence middleware for data retention
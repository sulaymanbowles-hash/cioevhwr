# Website Improvement Plan

## 1. Design & User Experience (UX)

### Visual Hierarchy & Spacing
- **Issue:** Some sections, especially the Hero, feel too sparse.
- **Solution:**
  - Introduce more structured grid layouts for content sections.
  - Use subtle background patterns or gradients to break up large white spaces without adding clutter.
  - Increase font weights for key headings to improve readability against light backgrounds.

### Accessibility
- **Issue:** Small text sizes (e.g., 8px labels) and potential contrast issues.
- **Solution:**
  - Increase minimum font size to 12px for legibility.
  - Audit color contrast ratios, especially for gray text on white backgrounds.
  - Ensure all interactive elements have visible focus states.

### Mobile Responsiveness
- **Issue:** Complex 3D viewers and data-heavy tables need careful handling on small screens.
- **Solution:**
  - Implement a "View 3D" modal for mobile instead of inline viewers to save space.
  - Stack technical specification tables on mobile or use horizontal scrolling with sticky headers.
  - Ensure the mobile menu is easily accessible and touch-friendly.

## 2. Feature Enhancements

### Catalog Improvements
- **Pagination/Infinite Scroll:** Currently, all products are loaded. Implement pagination or infinite scroll for scalability.
- **Advanced Filtering:** Add multi-select for categories and materials.
- **View Options:** Allow users to toggle between Grid and List views.

### Search Experience
- **Global Search:** Enhance the header search to show instant results with thumbnails.
- **Fuzzy Search:** Implement fuzzy matching to handle typos in part numbers.

### Quote & Cart Flow
- **Mini-Cart:** Add a slide-out mini-cart/quote summary when items are added.
- **Quick Add:** Allow adding to quote directly from the product card without entering the detail page.

## 3. Performance Optimization

### 3D Model Loading
- **Lazy Loading:** Ensure models are only loaded when they enter the viewport.
- **Draco Compression:** Verify if models are compressed. If not, implement a pipeline to compress GLTF files.
- **Fallback Images:** Show high-quality renders while models are loading.

### Asset Optimization
- **Image Formats:** Serve images in WebP format.
- **Code Splitting:** Ensure route-based code splitting is working effectively.

## 4. SEO & Metadata

### Dynamic Metadata
- **Title & Description:** Ensure every page has a unique title and description.
- **Structured Data:** Add JSON-LD schema for Products and Breadcrumbs.
- **Sitemap:** Generate a sitemap.xml for search engines.

## 5. Code Quality & Maintenance

### Refactoring
- **Component Reusability:** Extract common UI patterns (buttons, cards) into a design system library within `src/components/ui`.
- **Type Safety:** Ensure strict TypeScript checks are enabled and used consistently.
- **Testing:** Add unit tests for critical logic (e.g., quote store, filtering).

## Implementation Roadmap

1.  **Phase 1: Quick Wins** - Accessibility fixes, mobile menu tweaks, metadata updates.
2.  **Phase 2: Catalog & Search** - Pagination, advanced filters, global search.
3.  **Phase 3: Performance** - 3D optimization, image formats.
4.  **Phase 4: Advanced Features** - User accounts, saved quotes, comparison history.

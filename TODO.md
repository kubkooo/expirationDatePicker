# Sample Snack app

## Overall
- use functional components (not classes)
- no hardcoded values in code (keep it separate)
- if possible use TScrip (not mandatory)
- we will need to create quickly some variants, so keep this in mind (styles, constants etc...)

## Tasks
- setUp colaboration system, rules, tools, roles etc.... (result should be on EXPO)
- header (use screenshot as inspiration)
- footer (use screenshot as inspiration)
- extract color constants (currently hardcoded)
- make meaningfull components that can be standalone and reusablec (callbacks, states, constants...)
- X, Y coloring (to be discussed)
- camera barcode scanner (optional) - whole screen (H & F still visible) 

## MOCK Data
- for demonstration of easy workflow (3-5 products) also for testing purposes (some local JSON)
  - barcode, product name, days to expiration (X, Y) [X - lkjlkjasf, Y - asdasdad]
    - example: {name: "Fresh Milk 1L", barCode: "1321654321", expX: 5, expY: 2 }
  - cases (X,Y)
    1. standard (5, 2)
    1. long exp (35, 15)
    1. short exp (2,1)
    1. just Y standard (null, 3)
    1. just Y short (null, 1)

## Variants
- we need to specify in component/s as parameters
  - number of rows (def: 6)
  - number of columns (def: 5)
  - styling (def: REDish colours)
  - icons with fallback (def: DEL, ..., ?)
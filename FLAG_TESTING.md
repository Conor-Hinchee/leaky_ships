# Test Flag Instructions

## Current Status

The test flag is currently **OFF** (returns `false`).

## To Test the Flag

1. **Turn the flag ON**:

   - Open `flags.ts`
   - Change line 7 from `return false;` to `return true;`
   - Save the file

2. **Check the console**:

   - Open browser dev tools (F12)
   - Go to the Console tab
   - Refresh the homepage
   - You should see "hello from flags" logged to the console

3. **Turn the flag OFF**:
   - Change line 7 back to `return false;`
   - Refresh the page
   - The console message should no longer appear

## File Locations

- Flag definition: `flags.ts`
- Flag usage: `src/app/page.js` (line 11-13)
- Demo page: `src/app/flags-demo/page.js`

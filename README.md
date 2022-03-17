# save-to-notion
A CLI for saving code snippets to a Notion page directly from your editor.

### Download dependencies
Run `npm i` in the root of the project to download dependencies.

### Link 
In the root, run `npm link .` to gain access to the `stn` command in your terminal.

### Create an integration at Notion
For save-to-notion to work, you'll need an integration token from Notion. Follow step 1 in the [Notion Developers 'Getting Started'](https://developers.notion.com/docs/getting-started) guide to set this up.

### Get your Notion page ID
You'll also need to provide a page ID. save-to-notion will send your code snippet to this page. You can find your page ID by 'Sharing' your page to the web, then taking the alphanumeric section of the URL. For instance, your link may look like:  

https://www.notion.so/My-Sample-Page-abcd1234zyxw0987qwertyuuiop

In this case, *abcd1234zyxw0987qwertyuuiop* would be your page ID. 

### Set .env variables.
Add a .env file to the root folder and add two keys: "INTEGRATION_TOKEN" and "PAGE_ID". Set them equal to your Notion integration token and page ID, respectively. If these variables are not present, save-to-notion will prompt you to enter them via the command line. You can do this when setting up your .env variables for the first time instead of creating a .env file. Currently, the only way to change the page ID is to manually change it in the .env file. 

```
INTEGRATION_TOKEN=poiuytrewq12345678
PAGE_ID=abcd1234zyxw0987qwertyuuiop
```

### You're good to go!
Place `// stn` at the start of where you would like to copy, place `// stnend` at the end. Then run `.stn [filepath]` in your console. save-to-notion will automatically create a block containing that code in your Notion page. 

```javascript
// stn
const exampleFn = () => {
  return 'hello save-to-notion'
}
// stnend
```

Note: Currently, only works with languages that use `//` for comments, which includes Javascript, Rust, Java, C++.

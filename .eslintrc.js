module.exports = {
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "rules": {
    "react/no-unknown-property": ["error", { 
      "ignore": [
        "position",
        "args",
        "intensity",
        "object",
        "geometry",
        "material",
        "rotation",
        "scale"
      ] 
    }]
  }
}
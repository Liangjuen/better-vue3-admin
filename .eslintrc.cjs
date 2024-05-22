module.exports = {
	"env": {
		browser: true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:vue/vue3-essential",
		'plugin:prettier/recommended'
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"parser": "@typescript-eslint/parser",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"vue"
	],
	"rules": {
		"@typescript-eslint/ban-ts-ignore": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-empty-function": "off",
		"vue/no-mutating-props": "off",
		"vue/component-name-in-template-casing": ["error", "kebab-case"],
		"vue/component-definition-name-casing": ["error", "kebab-case"],
		"no-use-before-define": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"space-before-function-paren": "off",
		"vue/attributes-order": "off",
		"vue/one-component-per-file": "off",
		"vue/html-closing-bracket-newline": "off",
		"vue/max-attributes-per-line": "off",
		"vue/multiline-html-element-content-newline": "off",
		"vue/multi-word-component-names": "off",
		"vue/singleline-html-element-content-newline": "off",
		"vue/attribute-hyphenation": "off",
		"vue/html-self-closing": "off",
		"vue/require-default-prop": "off",
		"vue/v-on-event-hyphenation": "off",
		"no-undef": "off"
	}
}

// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 'scope-empty': [0], // 0 = tắt hẳn, cho phép không có scope

    'scope-enum': [
      2, // 2 = error, chặn commit nếu sai
      'always',
      [
        'auth',
        'profile',
        'form',
        'router',
        'db',
        'ui',
        'deps',
        'config',
      ],
    ],
  },
}
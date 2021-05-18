module.exports = {
    branch: 'master',
    repositoryUrl: 'git@github.com:minq-team/core-api.git',
    plugins: [
      // analyze commits with conventional-changelog
      '@semantic-release/commit-analyzer',
      // generate changelog content with conventional-changelog
      '@semantic-release/release-notes-generator',
      // updates the changelog file
      '@semantic-release/changelog',
      // publishes to npm
      ['@semantic-release/npm', { npmPublish: false }],
      // creating a git tag
      '@semantic-release/github',
      // creating a new version commit
      "@semantic-release/git"
    ]
  };
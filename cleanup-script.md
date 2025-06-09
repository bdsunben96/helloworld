# 仓库清理脚本说明

本文档记录了如何使用 GitHub API 清空仓库中的 issue 和 PR 的操作步骤。

## 清空 Issue

使用 GitHub API 批量关闭 issue：

```bash
# 获取所有开放的 issue
curl -s -H "Authorization: token YOUR_GITHUB_TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/issues?state=open" | \
  jq -r '.[].number' | \
  while read issue_number; do
    # 关闭每个 issue
    curl -s -X PATCH -H "Authorization: token YOUR_GITHUB_TOKEN" \
      -d '{"state":"closed"}' \
      "https://api.github.com/repos/OWNER/REPO/issues/$issue_number"
    echo "Closed issue #$issue_number"
  done
```

## 清空 Pull Requests

使用 GitHub API 批量关闭 PR：

```bash
# 获取所有开放的 PR
curl -s -H "Authorization: token YOUR_GITHUB_TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/pulls?state=open" | \
  jq -r '.[].number' | \
  while read pr_number; do
    # 关闭每个 PR
    curl -s -X PATCH -H "Authorization: token YOUR_GITHUB_TOKEN" \
      -d '{"state":"closed"}' \
      "https://api.github.com/repos/OWNER/REPO/pulls/$pr_number"
    echo "Closed PR #$pr_number"
  done
```

## 注意事项

- 执行这些操作需要有仓库的管理权限
- 关闭 issue 和 PR 是不可逆的操作，请谨慎执行
- 建议在执行前备份重要的 issue 和 PR 信息

# Git 操作指南 — 减脂营养计划

## 基本信息

| 项目 | 内容 |
|------|------|
| 本地目录 | `e:\product_vscode_vide_code\recodes` |
| 远程仓库 | https://github.com/konkonkonjjj/recodes |
| 主分支 | `main` |
| 公网访问 | https://konkonkonjjj.github.io/recodes |

---

## 一、首次推送（已完成 ✅）

```bash
cd e:/product_vscode_vide_code/recodes

# 1. 关联远程仓库
git remote add origin https://github.com/konkonkonjjj/recodes.git

# 2. 切换到 main 分支
git branch -M main

# 3. 推送到 GitHub
git push -u origin main
```

> `-u origin main` 只第一次需要，之后直接 `git push` 即可。

---

## 二、日常修改提交流程

每当修改了代码后：

```bash
# 1. 查看改了哪些文件
git status

# 2. 添加所有改动到暂存区
git add -A

# 3. 提交（引号内写清楚改了什么）
git commit -m "描述你改了什么，例如：修复了热量计算精度问题"

# 4. 推送到 GitHub
git push
```

**简写版（一行）：**
```bash
git add -A && git commit -m "你的改动描述" && git push
```

---

## 三、常用 Git 命令速查

### 查看状态
```bash
git status              # 看改了哪些文件
git log --oneline -10   # 看最近 10 条提交记录
git diff                # 看具体改了什么内容（未暂存）
git diff --staged       # 看具体改了什么内容（已暂存）
```

### 撤销操作
```bash
git checkout -- 文件名      # 撤销某个文件的修改（未暂存）
git reset HEAD 文件名       # 取消某个文件的暂存
git reset --soft HEAD~1     # 撤销最近一次 commit（改动保留）
git reset --hard HEAD~1     # 撤销最近一次 commit（改动也丢弃⚠️）
```

### 分支操作
```bash
git branch              # 查看本地分支
git branch 分支名        # 创建新分支
git checkout 分支名      # 切换到某个分支
git branch -d 分支名     # 删除本地分支
```

---

## 四、多个设备间协作

### 场景 A：换了一台电脑，想把代码拉下来

```bash
# 1. 克隆仓库
git clone https://github.com/konkonkonjjj/recodes.git

# 2. 进入目录
cd recodes

# 3. 开始开发
```

### 场景 B：在另一台电脑上改完提交后，回来继续开发

```bash
# 拉取远程最新代码
git pull
```

### 场景 C：两台电脑同时改了同一个文件（冲突处理）

```bash
# 1. 先在当前电脑提交
git add -A && git commit -m "电脑A的改动"
git push

# 2. 在另一台电脑上
git pull   # 如果有冲突会提示

# 3. 如果有冲突，打开冲突文件，找到 <<<<<<< 标记
#    手动选择保留哪部分代码，删除冲突标记
#    然后：
git add -A
git commit -m "解决合并冲突"
git push
```

---

## 五、GitHub Pages 更新

推送到 `main` 分支后，GitHub Pages 会自动更新，无需额外操作。

- 推送后等待 1-2 分钟
- 刷新 https://konkonkonjjj.github.io/recodes 即可看到最新版本

---

## 六、快速参考：完整工作流

```bash
# 开始工作前（拉取最新代码）
git pull

# 写代码...

# 完成工作后（提交并推送）
git add -A
git commit -m "写了什么功能/修了什么bug"
git push
```

> 💡 每天开始写代码前先 `git pull`，写完记得 `git push`，养成习惯就不会有冲突。

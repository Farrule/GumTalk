# 開発環境

## 使用言語

・TS

## フレームワーク

・React Native + Expo Go

## IDE

・VS Code

# セットアップ方法の概要

1. `npm install -g expo-cli` でExpo CLIをインストール
2. `expo init GumTalk`でプロジェクトの作成（blank(TypeScript)を使用)
3. ESLintとPrettierを導入

# 開発とテスト

・VS Codeのターミナルで`npm start`を実行して開発サーバーを起動
・Webの場合、ターミナルで`w`を入力してデバッグ
・スマートフォンの場合、「Expo Go」アプリをインストールし、QRコードをスキャンして実機でデバッグ

# アプリ公開

・EASを使用
・EASリポジトリ
https://expo.dev/accounts/farrule/projects/gumtalk/updates/4d8666a6-0a41-44b4-a3dc-2557be9b1ad0

・アプリの更新
`eas update` を実行

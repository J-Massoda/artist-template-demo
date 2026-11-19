# Publish this demo on GitHub Pages

Status: prepared for publication, not yet uploaded or hosted on GitHub.

1. Create a public repository named `artist-template-demo` in your GitHub account. Do not add a starter README, gitignore or license; this package already includes its documentation.
2. Extract this ZIP. Use the repository’s **uploading an existing file** link or **Add file → Upload files**. Upload the extracted contents, including `assets`, `contenu`, `dates`, `rider`, and `index.html`, directly at the repository root. Upload the files, not the ZIP and not an enclosing folder. Commit to `main`.
3. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/ (root)**, then Save.
4. Wait for the Pages deployment to complete. Copy the published URL shown in Settings → Pages and test all four navigation tabs before sharing it with your client.

The package contains `.nojekyll` so GitHub serves the existing HTML without a Jekyll build. All site links are relative and work on a repository project path. No domain name or server setup is required.

Reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

The demo’s fidelity limitations remain described in README.md: interior page layouts are reconstructed, and original fonts and video assets were unavailable. Booking previews send nothing.

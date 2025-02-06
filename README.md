# **BatStats**  

![Node.js](https://img.shields.io/badge/Node.js-23.6.0-green?style=flat-square&logo=node.js)
![Yarn](https://img.shields.io/badge/Yarn-1.22.22-blue?style=flat-square&logo=yarn)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.6-blue?style=flat-square&logo=vite)
![Plotly](https://img.shields.io/badge/Plotly-2.35.3-blue?style=flat-square&logo=plotly)



<h2 align="center" margin="15px">
  <img src="https://github.com/Car85/batstats/blob/2de8763c3dc1d413f101dd5ea7c467fd7c9fd58d/icon/icon_batstats.png" alt="Fast - Free - Deep">
   <p>Fast-Free-Deep</p>
</h2>



# BatStats is a free and open-source application with no login required. It allows for fast, detailed deep dives into your CSV and Excel data using multiple charts and generate a pdf file with your dashboard to save and share it.

**⚠️⚠️⚠️ Batstat is an application still under development and has not released any official version yet.⚠️⚠️⚠️**


**Generate data charts and dashboards interactively.**  

BatStats is a dynamic and user-friendly solution for analyzing and visualizing data. Using **line charts, boxplots, barcharts and correlation matrix tables**, you can create interactive charts effortlessly, identify insights, and download them for your storytelling needs.  

The app leverages **React with TypeScript** and integrates the **Plotly** library for chart rendering.

---

## **🚀 Features**  

- **Dynamic Data Visualization**: Generate linecharts, barcharts and correlation Matrix.  
- **Customizable Box Plots**: Analyze numerical data with the option to select categorical variables.  
- **Drag-and-Drop CSV and Excel Upload**: Easily upload any CSV and Excel files for analysis.  
- **User-Friendly UI**: Scroll-snapping navigation for seamless interaction between sections.
- **Landscape Dashboard**: Download your landscape dashboard in a pdf file.

---

## **🖥️ Preliminary Demo (02/25)**  

[📽️ Watch Demo Video](https://github.com/user-attachments/assets/74a46639-8b23-4145-9693-375241f850b8)

---

## **🔧 Installation and Setup**  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/batstats.git
   cd batstats
   ```

2. **App Setup (React + Vite)**  
   - Install Node.js and npm/yarn.  
   - Navigate to the frontend folder:  
     ```bash
     cd frontend
     yarn install
     yarn run dev
     ```

4. **Access the Application**
   **The app will generate a random port, you will able to copy it from your terminal.**
   - Open [http://localhost:xxxx](http://localhost:3000) in your browser.  

---

## **🚧 Roadmap**  

      
### ✅ **Create the icon for batstats**
      
   Preliminary version of the icon:

   ![batstats](https://github.com/Car85/batstats/blob/2de8763c3dc1d413f101dd5ea7c467fd7c9fd58d/icon/icon_batstats.png)
      
### ✅ **Testing** 🚧
The initial **unitary** testing for both backend and frontend has been implemented. ⚠️ **However, this is an ongoing process** as new features and improvements are added. The testing suite will be continuously updated to ensure the application remains robust and reliable.

---

### ✅ **Implement correlation matrix.**  
### ✅ **Support additional xsls (Excel) file formats.**
### ✅ **Build the dashboard to landscape**
### ✅ **Create pdf file with the dashboard generated**

### ✅ **Security:**


| 🔒 **Risk** | ✅ **Mitigated BatStats** | 📜 **OWASP/UI Security Standard** |
|------------|---------------------|----------------------|
| **1. XSS (Cross-Site Scripting)** | ✅ Protected (`sanitizeData()` blocks `<script>`) | ✅ [OWASP A07:2021 – Identification & Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/) |
| **2. Clickjacking** | ✅ Protected (`Content-Security-Policy: frame-ancestors 'none'`) | ✅ [OWASP Clickjacking Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html) |
| **3. DoS with Large Files** | ✅ Protected (`processedRows` and `maxFiles: 1`) | ✅ [OWASP DoS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html) |
| **4. UI Freezing with Large Files** | ✅ Protected (`worker: true` in `Papa.parse`) | ✅ [Google UI Performance & Security Guidelines](https://developer.chrome.com/docs/devtools/) |
| **5. Malformed Excel Files** | ✅ Protected (`try/catch` and validation) | ✅ [OWASP Secure UI Design Principles](https://cheatsheetseries.owasp.org/cheatsheets/User_Interface_Security_Cheat_Sheet.html) |
| **6. Restricting Allowed File Types** | ✅ Protected (`useDropzone accept`) | ✅ [OWASP File Upload Security](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) |
| **7. Formula Injection in Excel** | ✅ Protected (`sanitizeData()`) | ✅ [OWASP Spreadsheet Injection Guide](https://owasp.org/www-community/attacks/Spreadsheet_Formula_Injection) |
| **8. Malicious URLs in CSV/XLSX** | ✅ Protected (`sanitizeData()` blocks URLs) | ✅ [OWASP Data Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) |
| **9. JavaScript Execution in PDFs** | ✅ Protected (Local loading of `jsPDF`, `addJS()` disabled) | ✅ [OWASP Untrusted Code Execution](https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A08-Insecure_Deserialization) |

---


- [ ] Enable report sharing via unique links.
- [ ] Deploy app in a web server.
- [ ] Create desktop, browser and android app.

---

## **🤝 Contributing**  

Contributions are welcome! If you'd like to improve BatStats, follow these steps:  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature/your-feature`).  
3. Commit your changes (`git commit -m 'Add your feature'`).  
4. Push to the branch (`git push origin feature/your-feature`).  
5. Open a Pull Request.  

---

## **📜 License**  

This project is licensed under the **GPL-3.0 License.**

---

## **💡 Acknowledgments**  

- [Node](https://github.com/nodejs/node)
- [Yarn](https://github.com/yarnpkg/yarn)
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Vite](https://github.com/vitejs/vite)
- [Plotly.js](https://github.com/plotly/plotly.js)  


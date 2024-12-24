# **BatStats**  
**Generate data charts and dashboards interactively.**  

BatStats is a dynamic and user-friendly solution for analyzing and visualizing data. Using **pivot tables**, you can create interactive charts effortlessly, identify insights, and download them for your storytelling needs.  

The frontend leverages **React with TypeScript** and integrates the **Plotly** library for chart rendering, while the backend is powered by **Java 23** and **Spring Boot**. Configurations and reports are stored in a lightweight **SQLite database**.

---

## **🚀 Features**  

- **Dynamic Data Visualization**: Generate pivot tables and interactive charts.  
- **Customizable Box Plots**: Analyze numerical data with the option to select categorical variables.  
- **Report Persistence**: Save and reload charts and dashboards locally without user registration.  
- **Drag-and-Drop CSV Upload**: Easily upload any CSV file for analysis.  
- **User-Friendly UI**: Scroll-snapping navigation for seamless interaction between sections.  

---

## **🛠️ Technologies Used**  

| Frontend | Backend | Database |
| -------- | ------- | -------- |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white) | ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white) |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) | |  
| ![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly&logoColor=white) | ![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white) | |

---

## **📊 How It Works**  

1. **Upload a CSV File**  
   Drag and drop your CSV dataset into the app.  

2. **Visualize Data**  
   - Use **Pivot Tables** to generate charts and insights.  
   - Explore **Box Plots** for statistical analysis (e.g., outliers, median, max, and min values).  
   - Customize your analysis by selecting categorical and numeric variables.  

3. **Save Reports**  
   Save your dashboards and charts locally without registration.  

4. **Reload and Continue**  
   Reload your saved data configurations and resume where you left off.  

---

## **🖥️ Preliminary Demo**  

[📽️ Watch Demo Video](https://github.com/user-attachments/assets/f5a5582a-7d09-42e3-a458-682f2abcd08d)

---

## **🔧 Installation and Setup**  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/batstats.git
   cd batstats
   ```

2. **Backend Setup (Spring Boot)**  
   - Install Java 23 and Maven.  
   - Navigate to the backend folder:  
     ```bash
     cd backend
     mvn spring-boot:run
     ```  

3. **Frontend Setup (React + Vite)**  
   - Install Node.js and npm/yarn.  
   - Navigate to the frontend folder:  
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

4. **Access the Application**  
   - Open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## **🚧 Roadmap**  

- [X] **Incorporate LocalStorage with UUID** for persistent dataset without user registration.

    Video Demo:
      
     [📽️ Watch Demo Video](https://github.com/user-attachments/assets/98e25ee1-da33-429e-b9ce-be699eaec608)

   
      
- [ ] **Create the icon for batstats**
- [ ] **Back and Front Testing.** 
- [ ] Implement more chart types (e.g., histograms, scatter plots).  
- [ ] Support additional file formats (e.g., Excel).  
- [ ] Add interactive filters for real-time data analysis.  
- [ ] Enable report sharing via unique links.  

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

- [React PivotTable](https://github.com/plotly/react-pivottable)  
- [Plotly.js](https://plotly.com/javascript/)  
- [Spring Boot](https://spring.io/projects/spring-boot)  


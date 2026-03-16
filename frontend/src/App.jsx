import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";

import AddBook from "./Pages/AddBooks";
import ViewBooks from "./Pages/ViewBooks";
import SemesterPage from "./Pages/Semester"; 
import FacultyHome from "./Pages/FacultyHome";

import AdvisorHome from "./Pages/AdvisorHome";
import AddStudent from "./Pages/AddStudent";
import ViewStudents from "./Pages/ViewStudents";
import StudentHome from "./Pages/StudentHome";
import AdminHome from "./Pages/AdminHome";
import AddAdvisor from "./Pages/AddAdvisor";
import ViewAdvisors from "./Pages/ViewAdvisor";
import AddHod from "./Pages/AddHod";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import AddFaculty from "./Pages/AddFaculty";
import ViewHod from "./Pages/ViewHod";
import ViewFaculty from "./Pages/ViewFaculty";
import SyllabusMapping from "./Pages/SyllabusMapping";
import ViewSyllabus from "./Pages/ViewSyllabus";
import BorrowingHistory from "./Pages/BorrowingHistory";
import MyBooks from "./Pages/MyBooks";


function App() {
  return (
    <Routes>

      {/* ---------- Public Route ---------- */}
      <Route path="/" element={<Login />} />

      {/* ---------- Admin Routes ---------- */}
      <Route
        path="/adminhome"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <>
              <Header />
              <AdminHome />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/addadvisor"
        element={
          <ProtectedRoute allowedRoles={["admin", "hod"]}>
            <>
              <Header />
              <AddAdvisor />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/viewadvisors"
        element={
          <ProtectedRoute allowedRoles={["admin", "hod"]}>
            <>
              <Header />
              <ViewAdvisors />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/addhod"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <>
              <Header />
              <AddHod />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/viewhod"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <>
              <Header />
              <ViewHod />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/addfaculty"
        element={
          <ProtectedRoute allowedRoles={["admin", "hod"]}>
            <>
              <Header />
              <AddFaculty />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/viewfaculty"
        element={
          <ProtectedRoute allowedRoles={["admin", "hod"]}>
            <>
              <Header />
              <ViewFaculty />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/addbook"
        element={
          <ProtectedRoute allowedRoles={["admin", "hod"]}>
            <>
              <Header />
              <AddBook />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/viewbooks"
        element={
          <ProtectedRoute allowedRoles={["admin", "faculty", "advisor", "hod", "student"]}>
            <>
              <Header />
              <ViewBooks />
            </>
          </ProtectedRoute>
        }
      />

      {/* ---------- Advisor Routes ---------- */}
      <Route
        path="/advisorhome"
        element={
          <ProtectedRoute allowedRoles={["advisor", "hod"]}>
            <>
              <Header />
              <AdvisorHome />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/addstudent"
        element={
          <ProtectedRoute allowedRoles={["admin", "advisor", "hod"]}>
            <>
              <Header />
              <AddStudent />
            </>
          </ProtectedRoute>
        }
      />


      <Route
        path="/viewstudents"
        element={
          <ProtectedRoute allowedRoles={["admin", "advisor", "hod", "faculty"]}>
            <>
              <Header />
              <ViewStudents />
            </>
          </ProtectedRoute>
        }
      />

      {/* ---------- Student Routes ---------- */}
      <Route
        path="/studenthome"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <>
              <Header />
              <StudentHome />
            </>
          </ProtectedRoute>
        }
      />

      {/* ---------- Faculty / HOD Routes ---------- */}

      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={["faculty", "advisor", "hod"]}>
            <>
              <Header />
              <FacultyHome />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/semester"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <>
              <Header />
              <SemesterPage />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/syllabus-mapping"
        element={
          <ProtectedRoute allowedRoles={["admin", "hod", "advisor"]}>
            <>
              <Header />
              <SyllabusMapping />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-syllabus"
        element={
          <ProtectedRoute allowedRoles={["admin", "advisor", "student", "faculty", "hod"]}>
            <>
              <Header />
              <ViewSyllabus />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/borrowing-history"
        element={
          <ProtectedRoute allowedRoles={["admin", "advisor", "student", "faculty", "hod"]}>
            <>
              <Header />
              <BorrowingHistory />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mybooks"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <>
              <Header />
              <MyBooks />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>

    
  );
}

export default App;
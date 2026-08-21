package com.electricity;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String fullName = request.getParameter("fullName");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");

        if (!password.equals(confirmPassword)) {
            response.sendRedirect("register.jsp?error=password_mismatch");
            return;
        }

        String sql = "INSERT INTO users (full_name, username, password) VALUES (?, ?, ?)";

        try {

            Connection connection = DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql);

            statement.setString(1, fullName);
            statement.setString(2, username);
            statement.setString(3, password);

            statement.executeUpdate();

            statement.close();
            connection.close();

            response.sendRedirect("login.jsp");

        } catch (Exception e) {

            e.printStackTrace();

            response.sendRedirect("register.jsp?error=registration_failed");
        }
    }
}
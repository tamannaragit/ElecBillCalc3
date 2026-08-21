package com.electricity;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        String sql = "SELECT id, full_name FROM users WHERE username = ? AND password = ?";

        try {

            Connection connection = DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql);

            statement.setString(1, username);
            statement.setString(2, password);

            ResultSet result = statement.executeQuery();

            if (result.next()) {

                HttpSession session = request.getSession();

                session.setAttribute("userId", result.getInt("id"));
                session.setAttribute("userName", result.getString("full_name"));

                result.close();
                statement.close();
                connection.close();

                response.sendRedirect("dashboard.jsp");

            } else {

                result.close();
                statement.close();
                connection.close();

                response.sendRedirect("login.jsp?error=invalid");
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.sendRedirect("login.jsp?error=database");
        }
    }
}
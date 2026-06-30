package com.example.template;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class RepairDb {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/devora", "root", "123456");
            Statement stmt = conn.createStatement();
            
            int count = stmt.executeUpdate("DELETE FROM flyway_schema_history WHERE version = '7'");
            System.out.println("Deleted " + count + " rows from flyway_schema_history");
            
            try { stmt.execute("DROP TABLE auction_bids"); } catch(Exception e) {}
            try { stmt.execute("DROP TABLE bids"); } catch(Exception e) {}
            try { stmt.execute("DROP TABLE auctions"); } catch(Exception e) {}
            try { stmt.execute("DROP TABLE auction_categories"); } catch(Exception e) {}
            
            System.out.println("Cleaned V7");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

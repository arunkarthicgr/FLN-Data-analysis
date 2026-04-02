# ================================
# Student Excel Data Cleaning Tool
# ================================

import pandas as pd
import numpy as np

# -------------------------------
# File paths
# -------------------------------
INPUT_FILE = "students_raw.xlsx"
OUTPUT_FILE = "students_cleaned.xlsx"

# -------------------------------
# Load Data
# -------------------------------
def load_data(file_path):
    try:
        df = pd.read_excel(file_path)
        print("Data loaded successfully")
        return df
    except Exception as e:
        print("Error loading file:", e)
        return None

# -------------------------------
# Standardize Column Names
# -------------------------------
def clean_column_names(df):
    df.columns = (
        df.columns.str.strip()
        .str.lower()
        .str.replace(" ", "_")
        .str.replace("[^a-zA-Z0-9_]", "", regex=True)
    )
    return df

# -------------------------------
# Remove Duplicate Rows
# -------------------------------
def remove_duplicates(df):
    before = len(df)
    df = df.drop_duplicates()
    after = len(df)
    print(f"Removed {before - after} duplicate rows")
    return df

# -------------------------------
# Handle Missing Values
# -------------------------------
def handle_missing_values(df):
    for col in df.columns:
        if df[col].dtype == "object":
            df[col] = df[col].fillna("Unknown")
        else:
            df[col] = df[col].fillna(df[col].median())
    return df

# -------------------------------
# Clean Name Column
# -------------------------------
def clean_names(df):
    if "name" in df.columns:
        df["name"] = df["name"].str.strip().str.title()
    return df

# -------------------------------
# Clean Email Column
# -------------------------------
def clean_emails(df):
    if "email" in df.columns:
        df["email"] = df["email"].str.lower().str.strip()
    return df

# -------------------------------
# Standardize Gender
# -------------------------------
def clean_gender(df):
    if "gender" in df.columns:
        df["gender"] = df["gender"].str.lower().str.strip()
        df["gender"] = df["gender"].replace({
            "m": "male",
            "f": "female"
        })
    return df

# -------------------------------
# Clean Marks
# -------------------------------
def clean_marks(df):
    for col in df.columns:
        if "mark" in col:
            df[col] = pd.to_numeric(df[col], errors="coerce")
            df[col] = df[col].clip(0, 100)
    return df

# -------------------------------
# Remove Invalid Ages
# -------------------------------
def clean_age(df):
    if "age" in df.columns:
        df["age"] = pd.to_numeric(df["age"], errors="coerce")
        df = df[(df["age"] >= 5) & (df["age"] <= 25)]
    return df

# -------------------------------
# Create Total Marks
# -------------------------------
def calculate_total(df):
    mark_cols = [col for col in df.columns if "mark" in col]
    if mark_cols:
        df["total_marks"] = df[mark_cols].sum(axis=1)
    return df

# -------------------------------
# Create Average Marks
# -------------------------------
def calculate_average(df):
    mark_cols = [col for col in df.columns if "mark" in col]
    if mark_cols:
        df["average_marks"] = df[mark_cols].mean(axis=1)
    return df

# -------------------------------
# Assign Grades
# -------------------------------
def assign_grade(df):
    if "average_marks" in df.columns:
        conditions = [
            (df["average_marks"] >= 90),
            (df["average_marks"] >= 75),
            (df["average_marks"] >= 50),
            (df["average_marks"] < 50),
        ]
        grades = ["A", "B", "C", "Fail"]
        df["grade"] = np.select(conditions, grades)
    return df

# -------------------------------
# Sort Data
# -------------------------------
def sort_data(df):
    if "total_marks" in df.columns:
        df = df.sort_values(by="total_marks", ascending=False)
    return df

# -------------------------------
# Reset Index
# -------------------------------
def reset_index(df):
    df = df.reset_index(drop=True)
    return df

# -------------------------------
# Save Cleaned Data
# -------------------------------
def save_data(df, file_path):
    try:
        df.to_excel(file_path, index=False)
        print("Cleaned data saved successfully")
    except Exception as e:
        print("Error saving file:", e)

# -------------------------------
# Summary Report
# -------------------------------
def generate_summary(df):
    print("\n===== DATA SUMMARY =====")
    print("Total Students:", len(df))

    if "gender" in df.columns:
        print("\nGender Distribution:")
        print(df["gender"].value_counts())

    if "grade" in df.columns:
        print("\nGrade Distribution:")
        print(df["grade"].value_counts())

# -------------------------------
# Main Function
# -------------------------------
def main():
    df = load_data(INPUT_FILE)

    if df is None:
        return

    df = clean_column_names(df)
    df = remove_duplicates(df)
    df = handle_missing_values(df)
    df = clean_names(df)
    df = clean_emails(df)
    df = clean_gender(df)
    df = clean_marks(df)
    df = clean_age(df)
    df = calculate_total(df)
    df = calculate_average(df)
    df = assign_grade(df)
    df = sort_data(df)
    df = reset_index(df)

    generate_summary(df)
    save_data(df, OUTPUT_FILE)

# -------------------------------
# Run Script
# -------------------------------
if __name__ == "__main__":
    main()

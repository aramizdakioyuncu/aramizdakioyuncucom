import 'package:flutter/material.dart';

final ThemeData appThemeData = ThemeData(
  primaryColor: const Color.fromARGB(255, 0, 0, 0),
  primarySwatch: Colors.blue,
  visualDensity: VisualDensity.adaptivePlatformDensity,
  scaffoldBackgroundColor: Colors.white,
  canvasColor: Colors.grey.shade900,
  appBarTheme: const AppBarTheme(
    color: Colors.black,
    foregroundColor: Colors.white,
  ),
  searchBarTheme: SearchBarThemeData(
    backgroundColor: WidgetStatePropertyAll(Colors.grey.shade900),
    shape: const WidgetStatePropertyAll(LinearBorder.none),
    textStyle: const WidgetStatePropertyAll(
      TextStyle(color: Colors.amber),
    ),
  ),
  searchViewTheme: SearchViewThemeData(
    elevation: 0,
    backgroundColor: Colors.grey.shade900,
    dividerColor: Colors.amber,
    surfaceTintColor: Colors.white,
    headerTextStyle: const TextStyle(color: Colors.amber),
    headerHintStyle: const TextStyle(color: Color.fromARGB(131, 255, 193, 7)),
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ButtonStyle(
      backgroundColor:
          WidgetStateProperty.all(const Color.fromARGB(255, 66, 133, 244)),
      foregroundColor: WidgetStateProperty.all(Colors.white),
      shape: const WidgetStatePropertyAll(
        RoundedRectangleBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(2),
          ),
        ),
      ),
    ),
  ),
  buttonTheme: const ButtonThemeData(
    buttonColor: Colors.red,
  ),
  textButtonTheme: TextButtonThemeData(
    style: ButtonStyle(
      foregroundColor: WidgetStateProperty.all(Colors.white),
    ),
  ),
  snackBarTheme: const SnackBarThemeData(
    backgroundColor: Color(0xFF3C4CBD),
    contentTextStyle: TextStyle(
      color: Colors.white,
    ), // SnackBar metin rengi
    actionTextColor: Colors.yellow, //
  ),
  drawerTheme: const DrawerThemeData(
    backgroundColor: Colors.white,
  ),
  textTheme: const TextTheme(
    titleLarge: TextStyle(
      color: Colors.white,
    ),
    titleMedium: TextStyle(
      color: Colors.white,
    ),
    titleSmall: TextStyle(
      color: Colors.white,
    ),
    bodyLarge: TextStyle(
      color: Colors.white,
    ),
    bodyMedium: TextStyle(
      color: Colors.white,
    ),
    bodySmall: TextStyle(
      color: Colors.white,
    ),
  ),
  dividerTheme: const DividerThemeData(
    color: Colors.white,
    thickness: 3,
  ),
  listTileTheme: const ListTileThemeData(
    textColor: Colors.white,
    iconColor: Colors.white,
  ),
  checkboxTheme: CheckboxThemeData(
    checkColor: const WidgetStatePropertyAll(Colors.white),
    fillColor: WidgetStatePropertyAll(Colors.black.withOpacity(0.2)),
    overlayColor: WidgetStatePropertyAll(Colors.black.withOpacity(0.5)),
  ),
);


#include "pch.h"
#include <string>
#include <vector>
#include <math.h>
#include <limits>
#include <iostream>
using namespace std;

struct hints {
	string rowhints[5];
	string columnhints[5];

};
void drawBoard(int gboard[], int size, hints ghints) {
	string ROWS[] = { "r1","r2","r3","r4","r5" };
	int count = 0;


	cout << "__________________________" << endl;
	cout << "|--------|c1 c2 c3 c4 c5-|" << endl;
	cout << "|------------------------|" << endl;

	for (int x = 0; x < size; x++) {
		cout << "|" << ghints.rowhints[x] << "|" << ROWS[x] << "|";
		for (int y = 0; y < size; y++) {
			cout << gboard[count] << "  ";
			count++;
		}
		cout << "|";
		cout << endl;
	}
	cout << "__________________________" << endl;
	for (int i = 0; i < 5; i++) {
		cout << "c" << i+1 << " |" << ghints.columnhints[i] << endl;
	}
	return;
}
hints getHints(int gboard[], int size) {
	hints gHints;
	int rc, count = 0, runs = 0;
	string hint;
	
	//row hints
	for (int x = 0; x < size; x++) {
		for (int y = 0; y < size; y++) {
			if (gboard[count] == 1) {
				runs++; int p1 = 1;
				for (int z = y + 1; z < size; z++) {
					if (z + p1 - 1 == size) {
						break; 
					}
					if (gboard[count + p1] == 1) {
						runs++; p1++;
					}else {
						break;
					}
				}
				hint.append(to_string(runs));
				count = count + (runs - 1); for (int w = 0; w < runs - 1; w++) { hint.append("*"); }
				y = y + (runs - 1);
				runs = 0;
			}
			else {
				hint.append(" ");
			}
			count++;
		}
		gHints.rowhints[x] = hint;
		hint = "";
	}
	//collumn hints
	int runc = 0;
	count = 0; 
	hint = "";
	for (int y = 0; y < size; y++) {
		for (int x = 0; x < size; x++) {
			if (gboard[(x * 5) + y]) {
				runc++; int p2 = 1;
				for (int z = x + 1; z < size; z++) {
					if ((z) == size) { break; }
						
					if (gboard[(x * 5) + y + (5 * p2)] == 1) {
						runc++;
						p2++;
					}
					else { break; }
				}
				hint.append(to_string(runc));
				count = count + (runc - 1); for (int w = 0; w < runc - 1; w++) { hint.append("*"); }
				x = x + (runc - 1);
				runc = 0;
				count++;
			}
			else {
				hint.append(" ");
			}
		}
		gHints.columnhints[y] = hint;
		hint = "";
	}
	return gHints;
}
bool checkBoard(int input1, int input2, int gboard[], int dboard[], hints ghints) {
	if (gboard[((input1-1) * 5) + input2 -1] == 1) {
		return true;
	}

	return false;
}
bool checkWin(int gboard[], int aboard[]) {
	int count = 0;
	for (int x = 0; x < 5; x++) {
		for (int y = 0; y < 5; y++) {
			if (gboard[count] == aboard[count]) {
				count++;
			}
			else {
				return true;
			}
		}
	}
	return false;
}

int* makenewBoard(int size) {
	int *newBoard = new int[size];
	int count = 0, random;
	for (int x = 0; x < size; x++) {
		for (int y = 0; y < size; y++) {
			random = rand() % 2;
			newBoard[(x * 5) + y] = random;
		}
	}


	return newBoard;
}

int main()
{
	int gameBoard[25] = {
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0,0,0
	};
	int answerBoard[25] = { 
		1,1,1,1,1,
		0,0,1,1,1,
		1,0,0,0,0,
		1,0,0,1,1,
		1,0,1,1,0 };
	int answerBoard1[25] = {
		1,0,0,0,0,
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0,0,0,
		0,0,0,0,0
	};
	int *randomBoard;
	int boardSize = 5;
	//make board, hardset to 5
	randomBoard = makenewBoard(5);
	//generate hints
	hints gameHints;
	gameHints = getHints(randomBoard, boardSize);

	//print random board
	/*for (int x = 0; x < boardSize; x++) {
		for (int y = 0; y < boardSize; y++) {
			cout << randomBoard[(x * 5) + y] << " ";
		}
		cout << endl;
	}
	cout << endl;*/
	//Start Game
	int userrow, usercol;
	string cont = "";
	bool game = true;
	while (game) {
		bool var1;
		drawBoard(gameBoard, boardSize, gameHints);
		cout << "_________________________________" << endl;
		cout << "Enter row number: ";
		cin >> userrow;
		cout << "enter Column number: ";
		cin >> usercol;

		var1 = checkBoard(userrow, usercol, randomBoard, gameBoard, gameHints);
		if (var1 == true) {
			gameBoard[((userrow - 1) * 5) + usercol - 1] = 1;
		}
		else {
			cout << "(wrong spot)" << endl;
		}

		game = checkWin(gameBoard, randomBoard);
		if (game == false) {
			cout << "*************     *************" << endl;
			cout << "     ********solved********   " << endl;
			cout << "**************     ************" << endl;
			
			cout << "Continue?(y/n): ";
			cin >> cont;
			if (cont == "y") {
				game = true;
			}
		}
		//clear out the cin for next iteration
		cin.clear();
		cin.ignore(numeric_limits<streamsize>::max(), '\n');
	}
	return 0;
}


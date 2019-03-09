using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Snake
{
	public partial class Form1 : Form
	{
		private List<Circle> Snake = new List<Circle>();
		private Circle food = new Circle();
		private int j;

		public Form1()
		{
			InitializeComponent();

			//set settings to default
			new Settings();

			//speed and timer
			GameTimer.Interval = 1000 / Settings.Speed;
			GameTimer.Tick += UpdateScreen;
			GameTimer.Start();

			//
			StartGame();

		}

		private void UpdateScreen(object sender, EventArgs e)
		{
			//check for game over
			if (Settings.GameOver == true)
			{
				if (Input.KeyPressed(Keys.Enter))
				{
					StartGame();
				}
			}
			else
			{
				if (Input.KeyPressed(Keys.Right) && Settings.direction != Directions.Left)
					Settings.direction = Directions.Right;
				else if (Input.KeyPressed(Keys.Left) && Settings.direction != Directions.Right )
					Settings.direction = Directions.Left;
				else if (Input.KeyPressed(Keys.Up) && Settings.direction != Directions.Down)
					Settings.direction = Directions.Up;
				else if (Input.KeyPressed(Keys.Down) && Settings.direction != Directions.Up )
					Settings.direction = Directions.Down;

				MovePlayer();
			}

			pbCanvas.Invalidate();

		}

		private void StartGame()
		{
			labelGameOver.Visible = false;

			//
			new Settings();
			//create new player object
			Snake.Clear();
			Circle head = new Circle();
			head.X = 10;
			head.Y = 5;
			Snake.Add(head);

			LabelScore.Text = Settings.Score.ToString();
			labelLevel.Text = Settings.Level.ToString();

			GenerateFood();

		}
		//places random food in game
		private void GenerateFood()
		{
			int maxXPos = pbCanvas.Size.Width / Settings.Width;
			int maxYPos = pbCanvas.Size.Height / Settings.Height;

			do
			{
				Random random = new Random();
				food = new Circle();
				food.X = random.Next(0, maxXPos);
				food.Y = random.Next(0, maxYPos);
			} while (food.X == Snake[0].X && food.Y == Snake[0].Y);
		}

		private void pbCanvas_Paint(object sender, PaintEventArgs e)
		{
			Graphics canvas = e.Graphics;
			if (!Settings.GameOver)
			{
				//snake snake
				Brush snakeColour;
				//draw snake
				for (int i = 0; i < Snake.Count; i++)
				{
					if (i == 0)
						snakeColour = Brushes.Black;
					else
						snakeColour = Brushes.Green;

					//snake
					canvas.FillEllipse(snakeColour, new Rectangle(Snake[i].X * Settings.Width, Snake[i].Y * Settings.Height, Settings.Width, Settings.Height));
					//food
					canvas.FillEllipse(Brushes.Red, new Rectangle(food.X * Settings.Width, food.Y * Settings.Height, Settings.Height, Settings.Width));

				}
			}
			else
			{
				string gameOver = "Game over \nFinal Score: " + Settings.Score + "\nPress Enter to try again";
				labelGameOver.Text = gameOver;
				labelGameOver.Visible = true;
			}
		}
		private void MovePlayer()
		{
			for (int i = Snake.Count - 1; i >= 0; i--)
			{
				//move head
				if (i == 0)
				{
					switch (Settings.direction)
					{
						case Directions.Right:
							Snake[i].X++;
							break;
						case Directions.Left:
							Snake[i].X--;
							break;
						case Directions.Up:
							Snake[i].Y--;
							break;
						case Directions.Down:
							Snake[i].Y++;
							break;
					}

					//get max y and x pos
					int maxXPos = pbCanvas.Size.Width / Settings.Width;
					int maxYPos = pbCanvas.Size.Height / Settings.Height;
					//dectect collision with game borders
					if (Snake[i].X < 0 || Snake[i].Y < 0 || Snake[i].X >= maxXPos || Snake[i].Y >= maxYPos) { Dead(); }
					//detection collision with body
					for (int j = 1; j < Snake.Count; j++)
					{
						if (Snake[i].X == Snake[j].X && Snake[i].Y == Snake[j].Y) { Dead(); }
					}
					//collision with food peice
					if (Snake[0].X == food.X && Snake[0].Y == food.Y) { Eat(); }


				}//move body of snake
				else
				{
					Snake[i].X = Snake[i - 1].X;
					Snake[i].Y = Snake[i - 1].Y;
				}




			}
		}
		public void Eat()
		{
			Circle food = new Circle();
			food.X = Snake[Snake.Count - 1].X;
			food.Y = Snake[Snake.Count - 1].Y;
			Snake.Add(food);

			//updated total score
			Settings.Score += Settings.Points;
			LabelScore.Text = Settings.Score.ToString();

			//update level
			if (Settings.Score % 100 == 0)
			{
				//update level
				Settings.Level += 1;
				labelLevel.Text = Settings.Level.ToString();
				//change speed
				if(Settings.Level == 2) { Settings.Speed += 1; }
				else if(Settings.Level < 6 && Settings.Level > 2) { Settings.Speed += 2; }
				else if(Settings.Level < 10 && Settings.Level > 5) { Settings.Speed += 4; }
				else if(Settings.Level > 10) { Settings.Speed += 1; }
				
				GameTimer.Interval = 1000 / Settings.Speed;
				
			}
			

			GenerateFood();

		}
		public void Dead()
		{
			Settings.GameOver = true;
			//reset settings
			Settings.Speed = 12;
			GameTimer.Interval = 1000 / Settings.Speed;
			Settings.Level = 1;
		}

		private void Form1_KeyDown(object sender, KeyEventArgs e)
		{
			Input.ChangeState(e.KeyCode, true);
		}

		private void Form1_KeyUp(object sender, KeyEventArgs e)
		{
			Input.ChangeState(e.KeyCode, false);
		}

	}		
}

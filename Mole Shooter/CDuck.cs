using Mole_Shooter.Properties;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mole_Shooter
{
	class CDuck: CImageBase
	{
		private Rectangle _moleHotSpot = new Rectangle();

		public CDuck() : base(Resources.DuckHuntDuck)
		{
			_moleHotSpot.X = Left + 15;
			_moleHotSpot.Y = Top  - 1;
			_moleHotSpot.Width = 65;
			_moleHotSpot.Height = 65;
		}
		
		
		public void Update(int X, int Y)
		{
			Left = X;
			Top = Y;
			_moleHotSpot.X = Left ;
			_moleHotSpot.Y = Top - 1;
		}
		public bool Hit(int X, int Y)
		{
			Rectangle c = new Rectangle(X, Y, 5, 5); // create cursor rect 

			if (_moleHotSpot.Contains(c))
			{
				return true;
			}

			return false;
		}
	}
}

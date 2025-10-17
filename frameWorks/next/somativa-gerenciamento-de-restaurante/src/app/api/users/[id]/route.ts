import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { withAuth } from '../../../../lib/middleware';

export const DELETE = withAuth(
  async (req: NextRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
    try {
      await connectToDatabase();
      const params = await context.params;
      const userId = params.id as string;

      // Prevent deleting the current user or all managers
      const userToDelete = await User.findById(userId);
      if (!userToDelete) {
        return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
      }

      // Check if there are other managers
      if (userToDelete.role === 'manager') {
        const managerCount = await User.countDocuments({ role: 'manager' });
        if (managerCount <= 1) {
          return NextResponse.json({ message: 'Não é possível excluir o último gerente' }, { status: 400 });
        }
      }

      await User.findByIdAndDelete(userId);
      return NextResponse.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
    }
  }
);
